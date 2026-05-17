"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import { 
  FileText, 
  Printer, 
  Download, 
  Leaf, 
  ShieldCheck, 
  AlertTriangle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ReportPage() {
  const { results, companyData, aiAnalysis } = useDemo();

  if (!companyData || !results) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center print:hidden">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rapor Önizleme</h1>
            <p className="text-gray-500">Hazırlanan sürdürülebilirlik ön analiz raporu.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
              Yazdır
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Download className="w-4 h-4" />
              PDF İndir
            </Button>
          </div>
        </div>

        {/* Report Canvas */}
        <div className="bg-white border shadow-sm rounded-none md:rounded-lg overflow-hidden max-w-4xl mx-auto w-full print:border-none print:shadow-none">
          {/* Report Header */}
          <div className="p-12 border-b-8 border-green-600 bg-gray-50 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Leaf className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">GreenKOBI AI</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-1">Karbon Ayak İzi Ön Analizi</h2>
              <p className="text-gray-500 font-medium">Rapor No: GK-2026-05-16 • Tarih: 16 Mayıs 2026</p>
            </div>
            <div className="text-right">
              <div className="bg-white border p-4 rounded-xl shadow-sm inline-block">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">SKDM Risk Durumu</p>
                <Badge className={results.cbamRiskScore > 70 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                  {results.cbamRiskScore > 70 ? "YÜKSEK RİSK" : "DÜŞÜK/ORTA RİSK"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-12 space-y-12">
            {/* 1. Firma Bilgileri */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">1. Kurumsal Bilgiler ve Kapsam</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Firma Adı</p>
                  <p className="font-semibold text-gray-800">{companyData.productName || "Örnek KOBİ"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Ürün Grubu / HS Code</p>
                  <p className="font-semibold text-gray-800">{companyData.hsCode || "Belirtilmedi"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Analiz Dönemi</p>
                  <p className="font-semibold text-gray-800">Mayıs 2026</p>
                </div>
              </div>
            </section>

            {/* 2. Emisyon Sonuçları */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">2. Karbon Ayak İzi Hesaplama Sonuçları</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-green-50 rounded-2xl text-center">
                  <p className="text-sm font-bold text-green-800 mb-2">Toplam Emisyon</p>
                  <p className="text-4xl font-black text-green-600">{results.totalCarbonTon.toFixed(2)}</p>
                  <p className="text-xs font-bold text-green-800 mt-1">tCO2e</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl text-center">
                  <p className="text-sm font-bold text-blue-800 mb-2">Karbon Yoğunluğu</p>
                  <p className="text-4xl font-black text-blue-600">{results.carbonIntensity.toFixed(3)}</p>
                  <p className="text-xs font-bold text-blue-800 mt-1">kg CO2e / kg ürün</p>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl text-center">
                  <p className="text-sm font-bold text-orange-800 mb-2">Enerji Verimliliği</p>
                  <p className="text-4xl font-black text-orange-600">{results.electricityIntensity.toFixed(2)}</p>
                  <p className="text-xs font-bold text-orange-800 mt-1">kWh / kg ürün</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-t">
                    <TableHead>Kapsam (Scope)</TableHead>
                    <TableHead>Kaynaklar</TableHead>
                    <TableHead className="text-right">Emisyon (kg CO2e)</TableHead>
                    <TableHead className="text-right">Pay (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">Scope 1 (Doğrudan)</TableCell>
                    <TableCell className="text-xs">Doğalgaz, Yakıt, Şirket Araçları</TableCell>
                    <TableCell className="text-right">{results.scope1Kg.toFixed(0)}</TableCell>
                    <TableCell className="text-right">{((results.scope1Kg / results.totalCarbonKg) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Scope 2 (Enerji Endirekt)</TableCell>
                    <TableCell className="text-xs">Satın Alınan Elektrik</TableCell>
                    <TableCell className="text-right">{results.scope2Kg.toFixed(0)}</TableCell>
                    <TableCell className="text-right">{((results.scope2Kg / results.totalCarbonKg) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Scope 3 (Diğer Endirekt)</TableCell>
                    <TableCell className="text-xs">Lojistik, Çalışan Ulaşımı</TableCell>
                    <TableCell className="text-right">{results.scope3Kg.toFixed(0)}</TableCell>
                    <TableCell className="text-right">{((results.scope3Kg / results.totalCarbonKg) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            {/* 3. AI Analizi */}
            {aiAnalysis && (
              <section className="bg-gray-50 p-8 rounded-2xl border">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="text-green-600 w-6 h-6" />
                  <h3 className="text-lg font-bold text-gray-900">3. AI Stratejik Değerlendirme</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{aiAnalysis.summary}"
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider underline">Kritik Öneriler</h4>
                    <ul className="space-y-3">
                      {aiAnalysis.recommendations.slice(0, 2).map((rec, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span><strong>{rec.title}:</strong> {rec.expectedCo2Reduction} azaltım ve {rec.estimatedSaving} tasarruf beklentisi.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider underline">SKDM / CBAM Analizi</h4>
                    <p className="text-sm text-gray-600">
                      {aiAnalysis.cbamRiskComment}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Disclaimer */}
            <div className="pt-12 border-t text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Önemli Uyarı</p>
              </div>
              <p className="text-[10px] text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Bu rapor GreenKOBI AI tarafından sağlanan veriler ışığında bir ön değerlendirme amacıyla oluşturulmuştur. 
                Hesaplamalar varsayılan emisyon faktörleri üzerinden yapılmıştır. Resmi beyan, ISO 14064 belgelendirmesi 
                veya yasal bildirim yerine geçmez. Kesin sonuçlar için yetkili kuruluşlarla doğrulama yapılmalıdır.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12 text-center print:hidden">
          <Button variant="ghost" className="text-gray-400">Rapor ayarlarını düzenle</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
