"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import { 
  Lightbulb, 
  TrendingDown, 
  ArrowRight,
  ShieldAlert,
  AlertCircle,
  Sparkles,
  Trophy,
  ArrowUp,
  Loader2
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
import Link from "next/link";

const rankingData = [
  { rank: 1, name: "Tekno-Yeşil A.Ş.", score: 98, isCurrent: false },
  { rank: 2, name: "Sürdürülebilir Metal", score: 92, isCurrent: false },
  { rank: 3, name: "Doğa-Dostu Fabrika", score: 85, isCurrent: false },
  { rank: 4, name: "Sizin Şirketiniz", score: 72, isCurrent: true },
  { rank: 5, name: "Eski-Usul Sanayi", score: 60, isCurrent: false },
  { rank: 6, name: "Klasik Üretim", score: 45, isCurrent: false },
];

export default function RecommendationsPage() {
  const { aiAnalysis, runAnalysis, isLoading, results, companyData } = useDemo();

  useEffect(() => {
    if (results && !aiAnalysis && !isLoading) {
      runAnalysis();
    }
  }, [results, aiAnalysis, isLoading, runAnalysis]);

  if (!results || !companyData) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Öneriler için veri girişi yapmalısınız</h3>
          <Link href="/dashboard" className="mt-4 inline-block">
            <Button>Veri Girişine Git</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Green AI Önerileri</h1>
            <p className="text-gray-500">İşletmenize özel verimlilik ve uyum stratejileri.</p>
          </div>
          <Button onClick={runAnalysis} variant="outline" className="gap-2 rounded-xl" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-green-600" />}
            Analizi Yenile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area (Left/Center) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* 2x2 Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Enerji Optimizasyonu", type: "Sanayi", text: "Makineleriniz için standby modunu optimize edin. Yıllık 12.000 TL tasarruf.", priority: "Yüksek" },
                { title: "Atık Dönüşümü", type: "Atık", text: "Tehlikeli atıkların %20'sini geri dönüşüme kazandırarak karbon vergisinden muaf olabilirsiniz.", priority: "Orta" },
                { title: "Lojistik Rotası", type: "Ulaşım", text: "Şehir içi nakliye rotalarınızı AI ile optimize ederek yakıt tüketimini %15 azaltın.", priority: "Yüksek" },
                { title: "Su Geri Kazanımı", type: "Kaynak", text: "Gri su geri kazanım ünitesi ile ürün başına su yoğunluğunu 4 L/kg altına indirin.", priority: "Düşük" },
              ].map((rec, i) => (
                <Card key={i} className="border-gray-100 hover:shadow-md transition-all rounded-2xl">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant={rec.priority === "Yüksek" ? "destructive" : "secondary"} className="rounded-full text-[9px] h-5">{rec.priority}</Badge>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{rec.type}</span>
                    </div>
                    <CardTitle className="text-base font-bold">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500 leading-relaxed">"{rec.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* SKDM Tax Burden - Mini Recommendation Style at bottom */}
            <Card className="border-orange-100 bg-orange-50/20 rounded-2xl border-dashed">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldAlert className="text-orange-600 w-4 h-4" />
                </div>
                <div className="flex-1">
                   <p className="text-xs text-slate-600 font-medium">
                     <strong className="text-slate-900">SKDM Vergi Yükü:</strong> Mevcut emisyonunuzla yıllık <span className="text-orange-600 font-bold">€12,500</span> vergi riski taşıyorsunuz.
                   </p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 text-[9px] rounded-full">Risk: Orta-Yüksek</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-1">
            <Card className="border-gray-100 rounded-2xl overflow-hidden h-full">
              <CardHeader className="p-4 bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-xs font-bold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  Sektörel Sıralama
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  {rankingData.map((item) => (
                    <div key={item.rank} className={`p-3 flex items-center justify-between ${item.isCurrent ? "bg-green-50/30" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${item.rank <= 3 ? "bg-yellow-400 text-white" : "bg-slate-100 text-slate-400"}`}>
                          {item.rank}
                        </span>
                        <span className={`text-[10px] ${item.isCurrent ? "font-bold text-slate-900" : "text-slate-600 font-medium"}`}>{item.name}</span>
                      </div>
                      <span className={`text-[9px] font-bold ${item.isCurrent ? "text-green-600" : "text-slate-400"}`}>
                        {item.score} P.
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 text-[10px] flex justify-between items-center text-slate-500 font-bold border-t border-slate-100 mt-auto">
                    <div className="flex flex-col items-center">
                        <span className="text-[7px] text-slate-400 uppercase tracking-tighter font-black">Mevcut</span>
                        <span className="text-xs font-black text-slate-900">4.</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <div className="flex flex-col items-center">
                        <span className="text-[7px] text-green-600 uppercase tracking-tighter font-black">Hedef</span>
                        <span className="text-xs font-black text-green-600 flex items-center gap-0.5">2. <ArrowUp className="w-2.5 h-2.5" /></span>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
