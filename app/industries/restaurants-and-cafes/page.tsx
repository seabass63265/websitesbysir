import type { Metadata } from "next";
import RestaurantsBody from "@/app/components/industries/restaurants/RestaurantsBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Restaurants & Cafés",
  description:
    "Custom website design and development for restaurants and cafés — digital menus, online ordering, reservations, POS and delivery integrations, and true bilingual (EN/ES) support. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function RestaurantsAndCafesPage() {
  return <RestaurantsBody />;
}
