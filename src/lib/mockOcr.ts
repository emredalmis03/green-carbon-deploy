import { CompanyData } from "./calculations";

export async function processDocument(file: File): Promise<Partial<CompanyData>> {
  // Simulate OCR delay
  await new Promise(r => setTimeout(r, 2000));

  const fileName = file.name.toLowerCase();

  // Return different mock data based on "file name" simulation
  if (fileName.includes("elektrik") || fileName.includes("electric")) {
    return { electricityKwh: 4500 };
  }
  if (fileName.includes("su") || fileName.includes("water")) {
    return { waterM3: 120 };
  }
  if (fileName.includes("dogalgaz") || fileName.includes("doğalgaz") || fileName.includes("gas")) {
    return { naturalGasM3: 850 };
  }

  return {
    electricityKwh: 1250,
    waterM3: 45,
    naturalGasM3: 320,
    productName: "Eko-Tekstil Ltd.",
    productionKg: 10000,
    hsCode: "6109.10",
    machines: [],
    employeeTransport: []
  };
}

export function getDemoData(): CompanyData {
  return {
    electricityKwh: 8500,
    waterM3: 240,
    naturalGasM3: 1200,
    dieselLiter: 450,
    lpgLiter: 120,
    fuelOilLiter: 0,
    coalKg: 500,
    logisticsDistanceKm: 500,
    logisticsWeightTon: 15,
    productionKg: 25000,
    productName: "Alüminyum Profil Üretimi",
    hsCode: "7604.21",
    machines: [
      { id: "1", name: "Ekstrüzyon Presi - Line 1", count: 1, avgHoursPerDay: 18, powerKw: 250 },
      { id: "2", name: "Soğutma Fanları", count: 4, avgHoursPerDay: 24, powerKw: 15 },
      { id: "3", name: "Kesme Testeresi", count: 2, avgHoursPerDay: 8, powerKw: 45 }
    ],
    employeeTransport: [
      { type: "bus", employeeCount: 35, avgDailyKm: 40 },
      { type: "private_car", employeeCount: 8, avgDailyKm: 25 },
      { type: "walking_or_bike", employeeCount: 2, avgDailyKm: 2 }
    ],
    employeeCount: 45
  };
}
