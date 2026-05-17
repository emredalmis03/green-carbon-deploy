"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import { 
  Target, 
  Building2, 
  Landmark, 
  Globe, 
  ChevronRight,
  Zap,
  Droplets,
  Truck,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const INCENTIVES = [
  {
    id: "kosgeb-green",
    title: "KOSGEB Yeşil Dönüşüm Destek Programı",
    provider: "KOSGEB",
    matchCriteria: "electricity",
    description: "KOBİ'lerin güneş enerjisi ve verimlilik artırıcı yatırımları için 4.000.000 TL'ye kadar geri ödemesiz destek.",
    benefit: "%70 Destek Oranı",
    tags: ["GES", "Verimlilik", "Makine Modernizasyonu"]
  },
  {
    id: "ebrd-turreff",
    title: "TurSEFF Sürdürülebilir Enerji Finansmanı",
    provider: "EBRD / Yerel Bankalar",
    matchCriteria: "efficiency",
    description: "Düşük faizli kredi ve teknik danışmanlık hizmeti ile enerji verimliliği projelerinin finansmanı.",
    benefit: "Düşük Faizli Kredi",
    tags: ["Finansman", "Kredi", "Enerji"]
  },
  {
    id: "tubitak-1501",
    title: "TÜBİTAK Yeşil Mutabakat Ar-Ge Projeleri",
    provider: "TÜBİTAK",
    matchCriteria: "innovation",
    description: "Yeşil mutabakat hedeflerine yönelik yeni ürün ve süreç geliştirme projelerine %75 hibe.",
    benefit: "%75 Hibe",
    tags: ["Ar-Ge", "İnovasyon", "Yeni Ürün"]
  },
  {
    id: "moit-yatirim",
    title: "Yatırım Teşvik Belgesi (Bölgesel)",
    provider: "Sanayi ve Teknoloji Bakanlığı",
    matchCriteria: "investment",
    description: "Vergi indirimi, SGK prim desteği ve KDV istisnası ile büyük ölçekli modernizasyon yatırımları.",
    benefit: "Vergi Muafiyeti",
    tags: ["Vergi", "SGK Desteği", "Gümrük Muafiyeti"]
  },
  {
    id: "ticaret-cbam",
    title: "SKDM Danışmanlık ve Raporlama Desteği",
    provider: "Ticaret Bakanlığı",
    matchCriteria: "cbam",
    description: "İhracatçı firmaların SKDM kapsamında yaptıracağı raporlama ve doğrulama hizmetlerinin %50'si karşılanır.",
    benefit: "%50 Geri Ödeme",
    tags: ["Danışmanlık", "Raporlama", "SKDM"]
  }
];

export default function IncentivesPage() {
  const { results } = useDemo();

  // Simple matching logic
  const getMatches = () => {
    if (!results) return INCENTIVES;

    const matches = [...INCENTIVES];
    
    // Sort by relevance based on results
    return matches.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (results.scope2Kg > 5000 && a.matchCriteria === "electricity") scoreA += 10;
      if (results.scope2Kg > 5000 && b.matchCriteria === "electricity") scoreB += 10;
      
      if (results.cbamRiskScore > 60 && a.matchCriteria === "cbam") scoreA += 20;
      if (results.cbamRiskScore > 60 && b.matchCriteria === "cbam") scoreB += 20;

      return scoreB - scoreA;
    });
  };

  const matchedIncentives = getMatches();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teşvik Eşleştirme</h1>
          <p className="text-gray-500">İşletmenizin emisyon profiline ve ihtiyaçlarına uygun devlet destekleri.</p>
        </div>

        {/* Highlighted Match */}
        {results && results.cbamRiskScore > 50 && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="text-orange-600 w-8 h-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-orange-900 mb-1">SKDM Riski Tespit Edildi!</h3>
              <p className="text-orange-800 text-sm">
                Ürettiğiniz ürünler SKDM kapsamına giriyor. Ticaret Bakanlığı'nın "Yeşil Dönüşüm Danışmanlık" desteğinden faydalanarak raporlama maliyetlerinizi %50 azaltabilirsiniz.
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 whitespace-nowrap">Hemen Başvur</Button>
          </div>
        )}

        {/* Incentives List */}
        <div className="grid grid-cols-1 gap-6">
          {matchedIncentives.map((inc) => (
            <Card key={inc.id} className="overflow-hidden border-gray-100 hover:border-green-200 transition-colors group">
              <div className="flex flex-col md:flex-row">
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                      <Landmark className="text-gray-400 group-hover:text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{inc.provider}</p>
                      <h3 className="text-xl font-bold text-gray-900">{inc.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed max-w-3xl">
                    {inc.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {inc.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50/50 border-l border-gray-100 p-8 md:w-80 flex flex-col justify-center items-center text-center">
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Destek Avantajı</p>
                    <p className="text-2xl font-black text-green-600">{inc.benefit}</p>
                  </div>
                  <Button className="w-full bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 gap-2 shadow-sm">
                    Detayları Gör
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <Card className="bg-green-900 text-white border-none p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Başvuru Sürecinde Destek İster Misiniz?</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              GreenKOBI AI uzmanları, teşvik dosyalarınızın hazırlanmasında ve teknik raporlama süreçlerinde size rehberlik eder.
            </p>
            <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-8 rounded-full font-bold">
              Uzmanla Görüş
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-800 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
        </Card>
      </div>
    </DashboardLayout>
  );
}
