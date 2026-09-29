"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Built Around the Tools You Already Use" — the ordering, reservation,
 * and discovery platforms a restaurant already runs on, grouped by job.
 */
export default function ToolsSection() {
  const t = useT();
  const categories = [
    {
      name: t("Ordering", "Pedidos"),
      tools: ["Toast", "DoorDash", "Grubhub", "Uber Eats", "ChowNow"],
    },
    {
      name: t("Reservations", "Reservaciones"),
      tools: ["OpenTable", "Resy", "Yelp Reservations"],
    },
    {
      name: t("Discovery", "Descubrimiento"),
      tools: [
        "Google Maps",
        "Yelp",
        "Instagram",
        "Facebook",
        "TikTok",
        "Twitter/X",
      ],
    },
  ];

  return (
    <NumberedSection
      n="03"
      label={t("Built Around the Tools You Already Use", "Construido Alrededor de las Herramientas que Ya Usas")}
      id="tools"
      className="inverted"
      bodyClassName="pad-global"
    >
      <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
        {t("Your systems, connected.", "Tus sistemas, conectados.")}
      </h2>
      <p className="text-md" style={{ marginBottom: "2.5rem" }}>
        {t(
          "Your website can connect with the ordering, reservation, review, mapping, and social platforms your restaurant already uses.",
          "Tu sitio web puede conectarse con las plataformas de pedidos, reservaciones, reseñas, mapas, y redes sociales que tu restaurante ya usa."
        )}
      </p>

      {categories.map((category, index) => (
        <div
          key={category.name}
          style={{
            marginBottom:
              index < categories.length - 1 ? "2.5rem" : "3rem",
          }}
        >
          <div className="text-sm tools-category__title">{category.name}</div>
          <div className="logo-grid">
            {category.tools.map((tool) => (
              <div key={tool} className="logo-item">
                {tool}
              </div>
            ))}
          </div>
        </div>
      ))}
    </NumberedSection>
  );
}
