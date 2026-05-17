export type RiskLevel = 'low' | 'medium' | 'high' | 'critical' | 'noData';

export interface CityCarbonData {
  city: string;
  osbCount: number;
  avgNO2: number;
  nationalAvgNO2: number;
  differencePercent: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: string;
  recommendation: string;
}

export interface TurkeyGeoJSON {
  type: string;
  features: Array<{
    type: string;
    properties: {
      name: string;
      number: number;
    };
    geometry: {
      type: string;
      coordinates: any;
    };
  }>;
}
