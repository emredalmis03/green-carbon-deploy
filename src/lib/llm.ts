import { CompanyData, CalculationResults } from "./calculations";

export interface AIRecommendation {
  title: string;
  targetSource: string;
  description: string;
  estimatedSaving: string;
  estimatedInvestment: string;
  paybackPeriod: string;
  expectedCo2Reduction: string;
  priority: "high" | "medium" | "low";
  incentiveSuggestion: string;
}

export interface AIResponse {
  summary: string;
  largestEmissionSource: string;
  cbamRiskComment: string;
  dataQualityComment: string;
  recommendations: AIRecommendation[];
  actionPlan: string[];
}

export async function getAIAnalysis(
  companyData: CompanyData,
  calculatedMetrics: CalculationResults
): Promise<AIResponse> {
  // Simulating LLM delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // In a real app, you would call Gemini API here
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Mock response for MVP
  return {
    summary: "İşletmenizin karbon ayak izi profili, ağırlıklı olarak elektrik tüketimi (Scope 2) ve üretim süreçlerindeki doğalgaz kullanımından kaynaklanmaktadır. Mevcut üretim hacmine göre karbon yoğunluğunuz sektör ortalamasının hafif üzerindedir.",
    largestEmissionSource: "Elektrik Tüketimi (Scope 2)",
    cbamRiskComment: "Alüminyum profiller (HS 7604) SKDM kapsamında yüksek riskli ürün grubundadır. Mevcut emisyon seviyeleriyle ton başına yaklaşık 45-60 EUR ek vergi yüküyle karşılaşma riskiniz bulunmaktadır.",
    dataQualityComment: "Veri setiniz %85 oranında tamdır. Lojistik detayları ve çalışan ulaşım verileri iyileştirilmelidir.",
    recommendations: [
      {
        title: "Çatı GES Yatırımı",
        targetSource: "Elektrik",
        description: "Fabrika çatısına 250kWp kapasiteli güneş enerji santrali kurulumu.",
        estimatedSaving: "850.000 TL/Yıl",
        estimatedInvestment: "2.500.000 TL",
        paybackPeriod: "3 Yıl",
        expectedCo2Reduction: "120 Ton CO2e/Yıl",
        priority: "high",
        incentiveSuggestion: "KOSGEB Yeşil Dönüşüm Destek Programı"
      },
      {
        title: "Kompresör Atık Isı Geri Kazanımı",
        targetSource: "Doğalgaz",
        description: "Hava kompresörlerinin atık ısısının üretim suyu ısıtmasında kullanılması.",
        estimatedSaving: "120.000 TL/Yıl",
        estimatedInvestment: "350.000 TL",
        paybackPeriod: "2.8 Yıl",
        expectedCo2Reduction: "25 Ton CO2e/Yıl",
        priority: "medium",
        incentiveSuggestion: "VAP (Verimlilik Artırıcı Projeler) Desteği"
      },
      {
        title: "LED Aydınlatma Dönüşümü",
        targetSource: "Elektrik",
        description: "Tüm üretim sahasının yüksek verimli LED armatürler ile yenilenmesi.",
        estimatedSaving: "45.000 TL/Yıl",
        estimatedInvestment: "80.000 TL",
        paybackPeriod: "1.8 Yıl",
        expectedCo2Reduction: "12 Ton CO2e/Yıl",
        priority: "low",
        incentiveSuggestion: "Enerji Verimliliği Danışmanlık Desteği"
      }
    ],
    actionPlan: [
      "KOSGEB Yeşil Dönüşüm başvurusu için ön hazırlık yapılması.",
      "Lojistik tedarikçilerinden emisyon raporu talep edilmesi.",
      "Üretim hattındaki makine bazlı enerji ölçerlerin sayısının artırılması."
    ]
  };
}
