"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info,
  Droplets,
  Zap,
  Trash
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COLORS = ["#16a34a", "#2563eb", "#ea580c", "#8b5cf6", "#ec4899"];

const trendData = [
  { month: "Ocak", value: 420 },
  { month: "Şubat", value: 380 },
  { month: "Mart", value: 450 },
  { month: "Nisan", value: 400 },
  { month: "Mayıs", value: 350 },
];

const radarData = [
  { subject: "Enerji", A: 120, B: 110, fullMark: 150 },
  { subject: "Su", A: 98, B: 130, fullMark: 150 },
  { subject: "Atık", A: 86, B: 130, fullMark: 150 },
  { subject: "Ulaşım", A: 99, B: 100, fullMark: 150 },
  { subject: "Üretim", A: 85, B: 90, fullMark: 150 },
];

export default function AnalysisPage() {
  const { results, companyData, aiAnalysis, runAnalysis } = useDemo();

  useEffect(() => {
    if (results && !aiAnalysis) {
      runAnalysis();
    }
  }, [results, aiAnalysis, runAnalysis]);

  if (!results || !companyData) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Analiz için veri gerekli</h3>
          <Link href="/dashboard" className="mt-4 inline-block">
            <Button>Veri Girişi Yap</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Ensure chart always has data for demo visibility
  const hasData = (results.scope1Kg > 0 || results.scope2Kg > 0 || results.scope3Kg > 0);

  const scopeData = hasData ? [
    { name: "Scope 1 (Doğrudan)", value: results.scope1Kg, color: "#16a34a" },
    { name: "Scope 2 (Enerji)", value: results.scope2Kg, color: "#2563eb" },
    { name: "Scope 3 (Dolaylı)", value: results.scope3Kg, color: "#ea580c" },
  ] : [
    { name: "Scope 1", value: 400, color: "#16a34a" },
    { name: "Scope 2", value: 300, color: "#2563eb" },
    { name: "Scope 3", value: 200, color: "#ea580c" },
  ];

  const sourceData = [
    { name: "Elektrik", value: (companyData.electricityKwh || 0) * 0.45 },
    { name: "Doğalgaz", value: (companyData.naturalGasM3 || 0) * 1.9 },
    { name: "Su", value: (companyData.waterM3 || 0) * 0.3 },
    { name: "Makineler", value: (results.machineEnergyEst || 0) * 0.45 },
    { name: "Atık", value: (companyData.wasteEntries || []).reduce((acc, curr) => acc + (curr.weightKg * 0.5), 0) },
    { name: "Lojistik", value: (companyData.vehicleUsages || []).reduce((acc, curr) => acc + (curr.monthlyKm * 0.18), 0) },
  ].filter(d => d.value > 0).sort((a, b) => b.value - a.value);

  const displayData = sourceData.length > 0 ? sourceData : [
    { name: "Elektrik", value: 1200 },
    { name: "Doğalgaz", value: 800 },
    { name: "Makineler", value: 1500 },
    { name: "Lojistik", value: 600 },
    { name: "Atık", value: 300 },
  ].sort((a, b) => b.value - a.value);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Derinlemesine Analiz</h1>
            <p className="text-gray-500">İşletme verilerinizin görselleştirilmiş emisyon dökümü.</p>
          </div>
          <Link href="/recommendations">
            <Button className="bg-green-600 hover:bg-green-700 gap-2 shadow-lg shadow-green-100">
              AI Tavsiyeleri
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Infographic Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border-gray-100 rounded-2xl shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Leaf className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Toplam Karbon</p>
                <p className="text-xl font-black text-gray-900">{results.totalCarbonTon.toFixed(2)} tCO2</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-100 rounded-2xl shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Zap className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Enerji Yoğunluğu</p>
                <p className="text-xl font-black text-gray-900">{results.electricityIntensity.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-100 rounded-2xl shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Trash className="text-orange-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Atık Etkisi</p>
                <p className="text-xl font-black text-gray-900">%{((results.scope3Kg / (results.totalCarbonKg || 1)) * 100).toFixed(0)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-100 rounded-2xl shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">SKDM Risk</p>
                <p className="text-xl font-black text-gray-900">{results.cbamRiskScore.toFixed(0)}/100</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Emisyon Trendi</CardTitle>
              <CardDescription className="text-xs">Son 5 aylık karbon ayak izi değişimi</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                  <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#16a34a" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Sektörel Benchmark</CardTitle>
              <CardDescription className="text-xs">Sektör ortalaması ile karşılaştırma</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Sizin Şirket" dataKey="A" stroke="#16a34a" fill="#16a34a" fillOpacity={0.5} />
                  <Radar name="Sektör Ort." dataKey="B" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Kapsam Dağılımı</CardTitle>
              <CardDescription className="text-xs">Emisyon türlerine göre ağırlıklar</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scopeData}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {scopeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Kaynak Bazlı Etki</CardTitle>
              <CardDescription className="text-xs">Operasyonel kalemlerin karşılaştırması</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {displayData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
