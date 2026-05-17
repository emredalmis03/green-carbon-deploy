"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  Info,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { CompanyData } from "@/lib/calculations";

export default function VerifyPage() {
  const { companyData, setCompanyData } = useDemo();
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyData | null>(null);

  useEffect(() => {
    if (companyData) {
      setFormData(companyData);
    } else {
      router.push("/upload");
    }
  }, [companyData, router]);

  if (!formData) return null;

  const handleChange = (key: keyof CompanyData, value: any) => {
    setFormData(prev => prev ? ({ ...prev, [key]: value }) : null);
  };

  const handleSubmit = () => {
    if (formData) {
      setCompanyData(formData);
      router.push("/dashboard");
    }
  };

  const renderField = (label: string, key: keyof CompanyData, type: string = "number", unit?: string, description?: string) => {
    const value = formData[key];
    const isMissing = value === undefined || value === "";

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Label className="text-sm font-medium text-gray-700">{label}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{description || `${label} bilgisini giriniz.`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isMissing && <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">Eksik Veri</Badge>}
        </div>
        <div className="relative">
          <Input
            type={type}
            value={value || ""}
            onChange={(e) => handleChange(key, type === "number" ? Number(e.target.value) : e.target.value)}
            className={isMissing ? "border-orange-300 bg-orange-50/30" : "border-gray-200 focus:ring-green-500"}
          />
          {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">{unit}</span>}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Üretici Bilgileri</h1>
            <p className="text-gray-500">İşletmenizin yeşil dönüşüm profilini oluşturmak için operasyonel verileri girin.</p>
          </div>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 gap-2 px-8 h-12 shadow-lg shadow-green-200">
            Analizi Başlat
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <Card className="hover:shadow-md transition-shadow border-gray-100">
            <CardHeader>
              <CardTitle>Firma ve Üretim Bilgileri</CardTitle>
              <CardDescription>Genel operasyonel veriler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderField("Firma / Tesis Adı", "productName", "text", undefined, "İşletmenizin resmi adını veya tesis ismini girin.")}
              {renderField("Toplam Üretim Miktarı", "productionKg", "number", "kg", "Analiz dönemindeki toplam net üretim miktarı.")}
              {renderField("GTİP / HS Code", "hsCode", "text", undefined, "Ürünün gümrük tarife istatistik pozisyonu. SKDM riski için kritiktir.")}
              {renderField("Çalışan Sayısı", "employeeCount", "number", "kişi", "Tesiste çalışan toplam personel sayısı.")}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Çalışan Ulaşım Tercihi</Label>
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <Select
                  value={formData.employeeTransportType || "bus"}
                  onValueChange={(v) => handleChange("employeeTransportType", v)}
                >
                  <SelectTrigger className="focus:ring-green-500">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private_car">Özel Araç</SelectItem>
                    <SelectItem value="bus">Servis / Otobüs</SelectItem>
                    <SelectItem value="metro">Metro / Raylı Sistem</SelectItem>
                    <SelectItem value="walking_or_bike">Yaya / Bisiklet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Energy Consumption */}
          <Card className="hover:shadow-md transition-shadow border-gray-100">
            <CardHeader>
              <CardTitle>Enerji ve Kaynak Tüketimi</CardTitle>
              <CardDescription>Faturalardan çıkarılan veriler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderField("Elektrik Tüketimi", "electricityKwh", "number", "kWh", "Aylık elektrik faturanızdaki toplam aktif tüketim.")}
              {renderField("Su Tüketimi", "waterM3", "number", "m3", "Aylık su faturanızdaki toplam tüketim miktarı.")}
              {renderField("Doğalgaz Tüketimi", "naturalGasM3", "number", "m3", "Isınma veya üretimde kullanılan toplam doğalgaz.")}
              <div className="grid grid-cols-2 gap-4">
                {renderField("Motorin", "dieselLiter", "number", "L", "Jeneratör veya iş makinelerinde kullanılan yakıt.")}
                {renderField("LPG", "lpgLiter", "number", "L", "Üretimde kullanılan sıvılaştırılmış petrol gazı.")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderField("Fuel-oil", "fuelOilLiter", "number", "L", "Isınma veya buhar üretiminde kullanılan yakıt.")}
                {renderField("Kömür", "coalKg", "number", "kg", "Üretim süreçlerinde kullanılan katı yakıt.")}
              </div>
              {renderField("Şirket Araçları Kat Edilen Yol", "vehicleKm", "number", "km", "Şirket üzerine kayıtlı araçların aylık toplam kilometresi.")}
            </CardContent>
          </Card>

          {/* Logistics & Machines */}
          <Card className="md:col-span-2 hover:shadow-md transition-shadow border-gray-100">
            <CardHeader>
              <CardTitle>Lojistik ve Ekipman Detayları</CardTitle>
              <CardDescription>Scope 3 ve verimlilik analizi için ek veriler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-sm font-semibold text-gray-900 border-b pb-2">Lojistik Verileri</h4>
                  {renderField("Nakliye Toplam Mesafe", "logisticsDistanceKm", "number", "km", "Hammade alımı ve ürün gönderimi için kat edilen toplam mesafe.")}
                  {renderField("Nakliye Toplam Ağırlık", "logisticsWeightTon", "number", "ton", "Taşınan toplam yük miktarı.")}
                </div>
                <div className="space-y-6">
                  <h4 className="text-sm font-semibold text-gray-900 border-b pb-2">Ana Makine Verileri</h4>
                  {renderField("Makine Adı/Modeli", "machineName", "text", undefined, "En yüksek enerji tüketen ana üretim makinesinin adı.")}
                  {renderField("Makine Gücü", "machinePowerKw", "number", "kW", "Makinenin kW cinsinden nominal gücü.")}
                  {renderField("Çalışma Süresi (Aylık)", "machineWorkingHours", "number", "saat", "Makinenin aktif olarak çalıştığı toplam süre.")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-100 rounded-xl">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Info className="text-orange-500 w-5 h-5" />
          </div>
          <p className="text-sm text-orange-800 flex-1">
            <strong>Dikkat:</strong> Lojistik ve çalışan ulaşım verileri Scope 3 emisyonlarınızı belirler. Bu verilerdeki eksiklikler SKDM risk skorunuzu etkileyebilir.
          </p>
        </div>

        <div className="flex justify-end gap-4 mb-12">
          <Button variant="ghost" onClick={() => router.push("/upload")}>Geri Dön</Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 px-12">Değişiklikleri Kaydet ve Analize Geç</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
