import { CityCarbonData } from '../types/carbonMap';

export const osbCarbonMockData: Record<string, CityCarbonData> = {
  "Bursa": {
    city: "Bursa",
    osbCount: 18,
    avgNO2: 0.000142,
    nationalAvgNO2: 0.000095,
    differencePercent: 49.4,
    riskScore: 82,
    riskLevel: "high",
    status: "Ulusal OSB ortalamasının üzerinde",
    recommendation: "Sanayi bölgelerinde enerji verimliliği denetimlerine öncelik verin ve daha temiz yakıta geçişi teşvik edin."
  },
  "İstanbul": {
    city: "İstanbul",
    osbCount: 12,
    avgNO2: 0.000165,
    nationalAvgNO2: 0.000095,
    differencePercent: 73.6,
    riskScore: 91,
    riskLevel: "critical",
    status: "Kritik emisyon tutarsızlığı tespit edildi",
    recommendation: "Tier 1 varlıkları için acil emisyon filtreleme sistemi yükseltmeleri gerekli."
  },
  "Kocaeli": {
    city: "Kocaeli",
    osbCount: 14,
    avgNO2: 0.000158,
    nationalAvgNO2: 0.000095,
    differencePercent: 66.3,
    riskScore: 88,
    riskLevel: "critical",
    status: "Yüksek endüstriyel yoğunluk riski",
    recommendation: "Gerçek zamanlı sensör ağlarını dağıtın ve hidrojene hazır altyapıya geçiş yapın."
  },
  "İzmir": {
    city: "İzmir",
    osbCount: 13,
    avgNO2: 0.000125,
    nationalAvgNO2: 0.000095,
    differencePercent: 31.5,
    riskScore: 64,
    riskLevel: "high",
    status: "Ulusal ortalamanın oldukça üzerinde",
    recommendation: "OSB çatılarına güneş enerjisi entegrasyonunu genişletin ve lojistik yakıt zincirlerini optimize edin."
  },
  "Ankara": {
    city: "Ankara",
    osbCount: 11,
    avgNO2: 0.000112,
    nationalAvgNO2: 0.000095,
    differencePercent: 17.8,
    riskScore: 48,
    riskLevel: "medium",
    status: "Orta risk seviyesi",
    recommendation: "Büyük ölçekli üretim birimlerinde atık ısı geri kazanım sistemlerini uygulayın."
  },
  "Konya": {
    city: "Konya",
    osbCount: 9,
    avgNO2: 0.000102,
    nationalAvgNO2: 0.000095,
    differencePercent: 7.3,
    riskScore: 32,
    riskLevel: "low",
    status: "Ulusal ortalama ile tutarlı",
    recommendation: "Mevcut verimlilik standartlarını koruyun ve döngüsel ekonomi girişimlerini araştırın."
  },
  "Gaziantep": {
    city: "Gaziantep",
    osbCount: 6,
    avgNO2: 0.000135,
    nationalAvgNO2: 0.000095,
    differencePercent: 42.1,
    riskScore: 71,
    riskLevel: "high",
    status: "Yükselen NO₂ sinyalleri tespit edildi",
    recommendation: "Hızla düşük karbonlu ısıtma sistemlerine geçişi teşvik edin."
  },
  "Adana": {
    city: "Adana",
    osbCount: 4,
    avgNO2: 0.000118,
    nationalAvgNO2: 0.000095,
    differencePercent: 24.2,
    riskScore: 52,
    riskLevel: "medium",
    status: "Ulusal ortalamanın üzerinde",
    recommendation: "Agro-sanayi tesislerinde biyokütle enerji projelerini teşvik edin."
  },
  "Kayseri": {
    city: "Kayseri",
    osbCount: 3,
    avgNO2: 0.000108,
    nationalAvgNO2: 0.000095,
    differencePercent: 13.6,
    riskScore: 41,
    riskLevel: "medium",
    status: "Ulusal ortalamaya yakın",
    recommendation: "Ticari üretim kümelerinde HVAC sistemlerini iyileştirin."
  },
  "Manisa": {
    city: "Manisa",
    osbCount: 5,
    avgNO2: 0.000115,
    nationalAvgNO2: 0.000095,
    differencePercent: 21.0,
    riskScore: 50,
    riskLevel: "medium",
    status: "Kabul edilebilir emisyon tutarlılığı",
    recommendation: "Metalürji bölgeleri için karbon yakalama pilot programlarını değerlendirin."
  }
};
