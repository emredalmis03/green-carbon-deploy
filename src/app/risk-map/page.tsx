"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { TurkeyCarbonMap } from "@/components/CarbonMap/TurkeyCarbonMap";
import { Satellite } from "lucide-react";

export default function RiskMapPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <Satellite className="w-8 h-8 text-indigo-500" />
            Türkiye OSB Karbon Risk Haritası
          </h1>
          <p className="text-gray-500 font-medium">
            Uydu tabanlı NO₂ verileri ve OSB yoğunluğu kullanılarak şehir bazlı sanayi emisyon riski hesaplanır.
          </p>
        </div>

        <TurkeyCarbonMap />
      </div>
    </DashboardLayout>
  );
}
