import React from "react";
import { BetNowSectionServer } from "./Server/BetNowSectionServer";
import { getAdminData } from "@/app/Hooks/useGetAdminData";

export interface Affiliate {
  id: number;
  created_at: string; // or Date if you’ll parse it
  name: string;
  code: string;
  affiliate_link: string;
  odds: string; // use `number` if you’ll store as numeric
  description: string;
  logo: string;
  promo_code: string;
}

const BetNowSection: React.FC = async () => {
  const data = await getAdminData<Affiliate[]>({
    key: ["BetNowSection"],
    path: "affiliates",
  });

  return <BetNowSectionServer data={data} />;
};

export default BetNowSection;
