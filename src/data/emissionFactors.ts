export const emissionFactors = {
  // Scope 1: Direct Emissions
  naturalGas: 1.9, // kg CO2e / m3
  diesel: 2.6,     // kg CO2e / litre
  lpg: 1.5,        // kg CO2e / litre
  fuelOil: 3.1,    // kg CO2e / litre
  coal: 2.4,       // kg CO2e / kg
  vehicleKm: 0.18, // kg CO2e / km (average fleet)

  // Scope 2: Indirect Emissions (Purchased energy)
  electricity: 0.45, // kg CO2e / kWh

  // Scope 3: Other Indirect Emissions
  logistics: 0.12, // kg CO2e / ton-km
  transport: {
    private_car: 0.15, // kg CO2e / km
    bus: 0.05,        // kg CO2e / km
    metro: 0.03,      // kg CO2e / km
    walking_or_bike: 0,
  }
};

export type EmissionFactors = typeof emissionFactors;
