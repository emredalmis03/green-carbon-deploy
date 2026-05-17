"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CompanyData, CalculationResults, calculateMetrics, HistoryEntry } from "@/lib/calculations";

interface AIResponse {
  summary: string;
  recommendations: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    cost: "high" | "medium" | "low";
  }>;
  largestEmissionSource: string;
}

interface DemoContextType {
  companyData: CompanyData | null;
  setCompanyData: (data: CompanyData) => void;
  results: CalculationResults | null;
  aiAnalysis: AIResponse | null;
  isLoading: boolean;
  runAnalysis: () => Promise<void>;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const generateDummyHistory = (base: number, variance: number): HistoryEntry[] => {
  const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"];
  return months.map(m => ({
    month: m,
    value: Math.floor(base + (Math.random() * variance * 2 - variance))
  }));
};

const initialData: CompanyData = {
  electricityKwh: 2840,
  waterM3: 145,
  naturalGasM3: 1650,
  electricityHistory: generateDummyHistory(2500, 400),
  waterHistory: generateDummyHistory(120, 30),
  gasHistory: generateDummyHistory(1500, 300),
  vehicleAssets: [
    { id: "v1", brand: "Ford Transit", fuelType: "diesel", hp: 130 },
    { id: "v2", brand: "Mercedes Sprinter", fuelType: "diesel", hp: 160 },
    { id: "v3", brand: "Renault Kangoo", fuelType: "diesel", hp: 95 },
  ],
  vehicleUsages: [
    { id: "u1", vehicleId: "v1", monthlyKm: 1250 },
    { id: "u2", vehicleId: "v2", monthlyKm: 2100 },
    { id: "u3", vehicleId: "v3", monthlyKm: 850 },
  ],
  machineAssets: [
    { id: "m1", name: "CNC Torna - A1", powerKw: 15 },
    { id: "m2", name: "Hidrolik Pres - B2", powerKw: 45 },
    { id: "m3", name: "Kompresör Sistemi", powerKw: 30 },
  ],
  machineUsages: [
    { id: "mu1", machineId: "m1", hoursPerMonth: 160 },
    { id: "mu2", machineId: "m2", hoursPerMonth: 120 },
    { id: "mu3", machineId: "m3", hoursPerMonth: 200 },
  ],
  wasteEntries: [
    { id: "w1", type: "plastic", weightKg: 120, disposalMethod: "recycle" },
    { id: "w2", type: "paper", weightKg: 250, disposalMethod: "recycle" },
    { id: "w3", type: "hazardous", weightKg: 15, disposalMethod: "landfill" },
  ],
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [companyData, setCompanyDataState] = useState<CompanyData | null>(initialData);
  const [results, setResults] = useState<CalculationResults | null>(calculateMetrics(initialData));
  const [aiAnalysis, setAiAnalysis] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setCompanyData = useCallback((data: CompanyData) => {
    setCompanyDataState(data);
    const newResults = calculateMetrics(data);
    setResults(newResults);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!companyData || !results) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAiAnalysis({
      summary: "İşletmenizin karbon ayak izi analizi tamamlandı. Toplam emisyonun büyük bir kısmı üretim süreçlerindeki enerji tüketiminden kaynaklanıyor.",
      largestEmissionSource: results.scope2Kg > results.scope1Kg ? "Elektrik Tüketimi" : "Doğrudan Yakıt Tüketimi",
      recommendations: [
        { title: "GES Yatırımı", description: "Çatı üzeri GES kurulumu önerilir.", impact: "high", cost: "high" },
        { title: "Verimlilik Artışı", description: "IE4 sınıfı motorlara geçiş.", impact: "medium", cost: "medium" }
      ]
    });
    setIsLoading(false);
  }, [companyData, results]);

  const resetDemo = useCallback(() => {
    setCompanyDataState(initialData);
    setResults(calculateMetrics(initialData));
    setAiAnalysis(null);
  }, []);

  return (
    <DemoContext.Provider value={{ companyData, setCompanyData, results, aiAnalysis, isLoading, runAnalysis, resetDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) throw new Error("useDemo must be used within a DemoProvider");
  return context;
}
