"use client";

/**
 * The 3D MacBook + iPhone for the business-type showcase, adapted from the
 * Codrops "device mockup" demo (`threepipe-device-mockup-codrops-master`).
 * The model carries its own camera views ("start", "front", "macbook",
 * "iphone", each with a "2" variant for phones) and open/closed/floating
 * transforms, so this only has to drive them. Choosing a business type opens
 * the laptop, floats the phone and plays that site on both screens; tapping a
 * device zooms in on it, tapping away (or Escape) pulls back out.
 *
 * Client-only (WebGL, ~12MB model) — mount through DeviceShowcase, which
 * lazy-loads this file.
 */

import { useEffect, useRef, useState } from "react";
import {
  CameraViewPlugin,
  CanvasTexture,
  ContactShadowGroundPlugin,
  type IObject3D,
  type ITexture,
  type PhysicalMaterial,
  PickingPlugin,
  PopmotionPlugin,
  SRGBColorSpace,
  ThreeViewer,
  TonemapPlugin,
  TransformAnimationPlugin,
  VideoTexture,
} from "threepipe";

export type SceneSelection = {
  label: string;
  desktop?: string;
  mobile?: string;
} | null;

type Device = "macbook" | "iphone";
type Target = { open: boolean; focus: Device | null };

// Screen aspect ratios (width / height) of the model's displays, used to crop
// each recording to fill its screen instead of stretching it.
const MAC_ASPECT = 1.6;
const PHONE_ASPECT = 1290 / 2796;

const MODEL_URL = "/models/tabletop_macbook_iphone.glb";
const isPhoneViewport = () => window.matchMedia("(max-width: 768px)").matches;
const viewName = (key: string) => (isPhoneViewport() ? key + "2" : key);

type Controller = {
  setSelection: (selection: SceneSelection) => void;
  setVisible: (visible: boolean) => void;
};

/** "Coming soon" screen for a side that has no recording yet. */
function placeholderTexture(label: string, aspect: number, font: string) {
  const width = aspect > 1 ? 1280 : 560;
  const height = Math.round(width / aspect);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#003153";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  const step = Math.round(width / 12);
  for (let x = step; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = step; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  const big = Math.round(width / 16);
  ctx.font = `700 ${big}px ${font}`;
  ctx.fillText("DEMO COMING SOON", width / 2, height / 2);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `400 ${Math.round(big * 0.6)}px ${font}`;
  ctx.fillText(label.toUpperCase(), width / 2, height / 2 + big * 1.4, width * 0.9);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export default function DeviceScene({
  selection,
  onFocusChange,
}: {
  selection: SceneSelection;
  onFocusChange?: (focus: Device | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const [ready, setReady] = useState(false);
  const onFocusChangeRef = useRef(onFocusChange);

  useEffect(() => {
    onFocusChangeRef.current = onFocusChange;
  }, [onFocusChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let viewer: ThreeViewer | null = null;
    const cleanups: (() => void)[] = [];

    // Deferred a tick so React's dev-only mount/unmount/mount never builds
    // (and tears down) a viewer for the discarded first mount.
    const start = setTimeout(async () => {
      const v = new ThreeViewer({
        canvas,
        msaa: false,
        renderScale: "auto",
        plugins: [
          PickingPlugin,
          PopmotionPlugin,
          CameraViewPlugin,
          TransformAnimationPlugin,
          ContactShadowGroundPlugin,
        ],
      });
      viewer = v;
      const devices = await v.load<IObject3D>(MODEL_URL);
      if (disposed || !devices) return;

      // Page scrolling wins over orbiting: the camera only moves via views.
      v.scene.mainCamera.controlsMode = "";
      // No backdrop of its own: the canvas is transparent so the page's white
      // shows through (a set colour would come out tone-mapped grey).
      v.scene.backgroundColor = null;
      v.scene.background = null;
      // The default filmic tone mapping mutes and darkens whatever the screens
      // play; off, the recordings show in their real colours.
      const tonemap = v.getPlugin(TonemapPlugin);
      if (tonemap) tonemap.enabled = false;

      const macbook = devices.getObjectByName("macbook")!;
      const iphone = devices.getObjectByName("iphone")!;
      const macbookScreen = macbook.getObjectByName("Bevels_2")!;
      const macMaterial = v.scene.getObjectByName("Object_7")
        ?.material as PhysicalMaterial | undefined;
      const phoneMaterial = v.scene.getObjectByName("xXDHkMplTIDAXLN")
        ?.material as PhysicalMaterial | undefined;
      if (macMaterial) {
        macMaterial.color.set(0, 0, 0);
        macMaterial.emissive.set(1, 1, 1);
        macMaterial.roughness = 0.2;
        macMaterial.metalness = 0.8;
        macMaterial.map = null;
      }
      // The phone's screen ships at 2x emissive, which blows bright colours
      // out; 1x matches the laptop.
      if (phoneMaterial) phoneMaterial.emissiveIntensity = 1;

      const transformAnim = v.getPlugin(TransformAnimationPlugin)!;
      const cameraView = v.getPlugin(CameraViewPlugin)!;
      const picking = v.getPlugin(PickingPlugin)!;
      picking.widgetEnabled = false;

      // ---- screens ----
      const font = getComputedStyle(document.body).fontFamily || "monospace";
      let screenTextures: ITexture[] = [];
      let videos: HTMLVideoElement[] = [];
      let visible = true;

      function releaseScreens() {
        screenTextures.forEach((texture) => texture.dispose());
        videos.forEach((video) => {
          video.pause();
          video.removeAttribute("src");
          video.load();
        });
        screenTextures = [];
        videos = [];
      }

      function coverFit(texture: ITexture, mediaAspect: number, screenAspect: number) {
        texture.repeat.set(1, 1);
        texture.offset.set(0, 0);
        if (mediaAspect > screenAspect) {
          texture.repeat.x = screenAspect / mediaAspect;
          texture.offset.x = (1 - texture.repeat.x) / 2;
        } else {
          texture.repeat.y = mediaAspect / screenAspect;
          texture.offset.y = (1 - texture.repeat.y) / 2;
        }
      }

      function screenFor(
        src: string | undefined,
        label: string,
        screenAspect: number
      ): ITexture {
        if (!src) {
          const texture = placeholderTexture(label, screenAspect, font) as unknown as ITexture;
          screenTextures.push(texture);
          return texture;
        }
        const video = document.createElement("video");
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "auto";
        video.src = src;
        if (visible) video.play().catch(() => {});
        videos.push(video);
        const texture = new VideoTexture(video) as unknown as ITexture;
        texture.colorSpace = SRGBColorSpace;
        video.addEventListener("loadedmetadata", () => {
          coverFit(texture, video.videoWidth / video.videoHeight, screenAspect);
        });
        screenTextures.push(texture);
        return texture;
      }

      function setSelection(selection: SceneSelection) {
        releaseScreens();
        if (!selection) {
          if (macMaterial) macMaterial.emissiveMap = null;
          if (phoneMaterial) phoneMaterial.emissiveMap = null;
        } else {
          if (macMaterial) {
            macMaterial.emissiveMap = screenFor(selection.desktop, selection.label, MAC_ASPECT);
          }
          if (phoneMaterial) {
            phoneMaterial.emissiveMap = screenFor(selection.mobile, selection.label, PHONE_ASPECT);
          }
        }
        macMaterial?.setDirty();
        phoneMaterial?.setDirty();
      }

      // ---- open / focus state machine (one animation batch at a time) ----
      let applied: Target | null = null;
      let wanted: Target = { open: false, focus: null };
      let running = false;

      async function run(target: Target, duration: number) {
        const { open, focus } = target;
        const macState = !open ? "closed" : focus === "iphone" ? "closed" : "open";
        const phoneState = !open ? "facedown" : focus === "macbook" ? "facedown" : "floating";
        const view = !open ? "start" : focus ?? "front";
        await Promise.all([
          transformAnim.animateTransform(macbookScreen, macState, duration)?.promise,
          transformAnim.animateTransform(iphone, phoneState, duration)?.promise,
          cameraView.animateToView(viewName(view), duration),
        ]);
      }

      async function pump() {
        if (running) return;
        running = true;
        while (
          !applied ||
          applied.open !== wanted.open ||
          applied.focus !== wanted.focus
        ) {
          const next = { ...wanted };
          const first = applied === null;
          applied = next;
          await run(next, first ? 50 : 700);
          if (disposed) break;
        }
        running = false;
      }

      function want(next: Partial<Target>) {
        wanted = { ...wanted, ...next };
        void pump();
      }

      // Tap/click a device to zoom in on it; tap it again or the backdrop to
      // pull back out. Only once a site is showing.
      function deviceOf(object: IObject3D): Device | null {
        let device: Device | null = null;
        object.traverseAncestors((ancestor) => {
          if (ancestor.name === "macbook") device = "macbook";
          if (ancestor.name === "iphone") device = "iphone";
        });
        return device;
      }
      picking.addEventListener("hitObject", (event) => {
        if (!wanted.open) return;
        const object = event.intersects.selectedObject as IObject3D | undefined;
        const device = object ? deviceOf(object) : null;
        const next = device && device !== wanted.focus ? device : null;
        want({ focus: next });
        onFocusChangeRef.current?.(next);
      });
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && wanted.focus) {
          want({ focus: null });
          onFocusChangeRef.current?.(null);
        }
      };
      document.addEventListener("keydown", onKey);
      cleanups.push(() => document.removeEventListener("keydown", onKey));

      controllerRef.current = {
        setSelection(selection) {
          setSelection(selection);
          want({ open: Boolean(selection), focus: null });
          onFocusChangeRef.current?.(null);
        },
        setVisible(next) {
          visible = next;
          v.renderEnabled = next;
          videos.forEach((video) => {
            if (next) video.play().catch(() => {});
            else video.pause();
          });
        },
      };

      await pump();
      if (!disposed) setReady(true);
    }, 0);

    return () => {
      disposed = true;
      controllerRef.current = null;
      clearTimeout(start);
      cleanups.forEach((fn) => fn());
      const v = viewer;
      if (!v) return;
      // ThreeViewer.dispose() removes every plugin without awaiting, so a
      // plugin that is still registered gets removed a second time and logs
      // "Wrong viewer". Removing them one at a time first avoids that.
      void (async () => {
        for (const plugin of Object.values(v.plugins)) {
          await v.removePlugin(plugin);
        }
        v.dispose();
      })();
    };
  }, []);

  // Only render (and decode video) while the section is on screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const io = new IntersectionObserver(([entry]) => {
      controllerRef.current?.setVisible(entry.isIntersecting);
    });
    io.observe(canvas);
    return () => io.disconnect();
  }, [ready]);

  useEffect(() => {
    if (ready) controllerRef.current?.setSelection(selection);
  }, [ready, selection]);

  return (
    <>
      <canvas ref={canvasRef} className="device-showcase__canvas" />
      {!ready && (
        <div className="device-showcase__loading text-xs" role="status">
          Loading 3D devices…
        </div>
      )}
    </>
  );
}
