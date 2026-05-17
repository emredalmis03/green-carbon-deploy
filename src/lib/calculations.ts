import { emissionFactors } from "@/data/emissionFactors";

export interface VehicleAsset {
  id: string;
  brand: string;
  fuelType: "diesel" | "gasoline" | "electric";
  hp: number;
}

export interface VehicleUsage {
  id: string;
  vehicleId: string;
  monthlyKm: number;
}

export interface MachineAsset {
  id: string;
  name: string;
  powerKw: number;
}

export interface MachineUsage {
  id: string;
  machineId: string;
  hoursPerMonth: number;
}

export interface WasteEntry {
  id: string;
  type: "plastic" | "paper" | "metal" | "glass" | "hazardous";
  weightKg: number;
  disposalMethod: "recycle" | "landfill" | "incineration";
}

export interface HistoryEntry {
  month: string;
  value: number;
}

export interface CompanyData {
  // Invoices
  electricityKwh?: number;
  waterM3?: number;
  naturalGasM3?: number;

  electricityHistory: HistoryEntry[];
  waterHistory: HistoryEntry[];
  gasHistory: HistoryEntry[];

  dieselLiter?: number;
  lpgLiter?: number;
  fuelOilLiter?: number;
  coalKg?: number;

  // Logistics / Fleet / Travel
  vehicleAssets: VehicleAsset[];
  vehicleUsages: VehicleUsage[];

  // Production
  productionKg?: number;
  productName?: string;
  hsCode?: string;

  // New Detailed Sections
  machineAssets: MachineAsset[];
  machineUsages: MachineUsage[];
  wasteEntries: WasteEntry[];
  employeeCount?: number;
}

export interface CalculationResults {
  totalCarbonKg: number;
  totalCarbonTon: number;
  scope1Kg: number;
  scope2Kg: number;
  scope3Kg: number;
  carbonIntensity: number; // kg CO2e / kg product
  electricityIntensity: number; // kWh / kg product
  waterIntensity: number; // L / kg product
  carbonPerEmployee: number;
  machineEnergyEst: number;
  logisticsEmissions: number;
  cbamRiskScore: number; // 0-100
  greenTransformationScore: number; // 0-100
  dataQualityScore: number; // 0-100
  missingData: string[];
}

export function calculateMetrics(data: CompanyData): CalculationResults {
  const missingData: string[] = [];

  // Scope 1
  const naturalGasEm = (data.naturalGasM3 || 0) * emissionFactors.naturalGas;
  const dieselEm = (data.dieselLiter || 0) * emissionFactors.diesel;
  const lpgEm = (data.lpgLiter || 0) * emissionFactors.lpg;
  const fuelOilEm = (data.fuelOilLiter || 0) * emissionFactors.fuelOil;
  const coalEm = (data.coalKg || 0) * emissionFactors.coal;
  const scope1Kg = naturalGasEm + dieselEm + lpgEm + fuelOilEm + coalEm;

  // Machine energy estimation (monthly)
  let totalMachinePower = 0;
  (data.machineUsages || []).forEach(usage => {
    const asset = data.machineAssets.find(a => a.id === usage.machineId);
    if (asset) {
      totalMachinePower += asset.powerKw * usage.hoursPerMonth;
    }
  });

  // Scope 2
  const scope2Kg = ((data.electricityKwh || 0) + totalMachinePower) * emissionFactors.electricity;

  // Waste emissions (Scope 3 - End of life)
  let wasteEm = 0;
  (data.wasteEntries || []).forEach(w => {
    const factor = w.disposalMethod === "recycle" ? 0.02 : w.disposalMethod === "landfill" ? 0.5 : 0.3;
    wasteEm += w.weightKg * factor;
  });

  // Fleet emissions
  let fleetEm = 0;
  (data.vehicleUsages || []).forEach(usage => {
    const asset = data.vehicleAssets.find(a => a.id === usage.vehicleId);
    if (asset) {
      const factor = asset.fuelType === "electric" ? 0.05 : 0.18;
      fleetEm += usage.monthlyKm * factor;
    }
  });

  const scope3Kg = wasteEm + fleetEm;

  const totalCarbonKg = scope1Kg + scope2Kg + scope3Kg;
  const totalCarbonTon = totalCarbonKg / 1000;

  const production = data.productionKg || 1;
  if (!data.productionKg) missingData.push("productionKg");
  if (!data.electricityKwh) missingData.push("electricityKwh");

  const carbonIntensity = totalCarbonKg / production;
  const electricityIntensity = (data.electricityKwh || 0) / production;
  const waterIntensity = ((data.waterM3 || 0) * 1000) / production;
  const carbonPerEmployee = totalCarbonKg / (data.employeeCount || 1);

  // Score logic
  const cbamRiskScore = Math.min(100, Math.max(0, (carbonIntensity * 50) + (data.hsCode ? 10 : 40)));
  const greenTransformationScore = Math.min(100, Math.max(0, 100 - (carbonIntensity * 20)));

  const dataQualityScore = data.electricityKwh && data.productionKg ? 90 : 40;

  return {
    totalCarbonKg,
    totalCarbonTon,
    scope1Kg,
    scope2Kg,
    scope3Kg,
    carbonIntensity,
    electricityIntensity,
    waterIntensity,
    carbonPerEmployee,
    machineEnergyEst: totalMachinePower,
    logisticsEmissions: fleetEm,
    cbamRiskScore,
    greenTransformationScore,
    dataQualityScore,
    missingData,
  };
}
