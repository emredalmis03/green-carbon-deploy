"use client";

import React, { useState, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import {
  Upload,
  Plus,
  Zap,
  Loader2,
  Truck,
  Droplets,
  Flame,
  Recycle,
  Factory,
  Minus,
  Car,
  History,
  CheckCircle2,
  Satellite,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleAsset, VehicleUsage, MachineAsset, MachineUsage, WasteEntry } from "@/lib/calculations";
import { useRouter } from "next/navigation";
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip as ChartTooltip } from "recharts";

export default function Dashboard() {
  const { companyData, setCompanyData } = useDemo();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("invoices");
  const [processingType, setProcessingType] = useState<string | null>(null);

  // States
  const [newVehicle, setNewVehicle] = useState<any>({ brand: "", fuelType: "diesel", hp: "" });
  const [newMachine, setNewMachine] = useState<any>({ name: "", powerKw: "" });
  const [vehicleUsage, setVehicleUsage] = useState<any>({ vehicleId: "", km: "" });
  const [machineUsage, setMachineUsage] = useState<any>({ machineId: "", hours: "" });
  const [newWaste, setNewWaste] = useState<any>({ type: "plastic", weightKg: "", disposalMethod: "recycle" });

  if (!companyData) return null;

  const handleFileUpload = async (type: "electricity" | "water" | "gas", file: File) => {
    setProcessingType(type);

    // Artificial delay for "processing"
    await new Promise(r => setTimeout(r, 2000));

    // Random values based on category
    const randomVal = type === "electricity" ? Math.floor(Math.random() * 3000) + 1000 :
      type === "water" ? Math.floor(Math.random() * 100) + 20 :
        Math.floor(Math.random() * 2000) + 500;

    const updatedData = { ...companyData };
    if (type === "electricity") updatedData.electricityKwh = randomVal;
    if (type === "water") updatedData.waterM3 = randomVal;
    if (type === "gas") updatedData.naturalGasM3 = randomVal;

    setCompanyData(updatedData);
    setProcessingType(null);
  };

  const handleFocus = (e: any) => e.target.select();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Veri Giriş Paneli</h1>
            <p className="text-gray-500 font-medium">Operasyonel verilerinizi yönetin ve analiz edin.</p>
          </div>
          <Button onClick={() => router.push("/analysis")} className="bg-green-600 hover:bg-green-700 h-12 px-8 shadow-lg shadow-green-100 font-bold rounded-xl">
            Analiz Raporunu Gör
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white border shadow-sm rounded-xl p-1">
            <TabsTrigger value="invoices" className="rounded-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700 font-bold">
              <Zap className="w-4 h-4 mr-2" /> Faturalar
            </TabsTrigger>
            <TabsTrigger value="logistics" className="rounded-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700 font-bold">
              <Truck className="w-4 h-4 mr-2" /> Ulaşım & Araçlar
            </TabsTrigger>
            <TabsTrigger value="machines" className="rounded-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700 font-bold">
              <Factory className="w-4 h-4 mr-2" /> Sanayi
            </TabsTrigger>
            <TabsTrigger value="waste" className="rounded-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700 font-bold">
              <Recycle className="w-4 h-4 mr-2" /> Geri Dönüşüm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: "electricity", label: "Elektrik", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50", unit: "kWh", data: companyData.electricityHistory, val: companyData.electricityKwh },
                { id: "water", label: "Su", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50", unit: "m³", data: companyData.waterHistory, val: companyData.waterM3 },
                { id: "gas", label: "Doğalgaz", icon: Flame, color: "text-orange-500", bg: "bg-orange-50", unit: "m³", data: companyData.gasHistory, val: companyData.naturalGasM3 },
              ].map((item) => (
                <Card key={item.id} className="relative overflow-hidden border-none shadow-md group rounded-3xl bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      {item.val && item.val > 0 ? (
                        <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">
                          <CheckCircle2 className="w-3 h-3" /> Güncel
                        </div>
                      ) : null}
                    </div>
                    <CardTitle className="text-xl font-bold mt-4">{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">{item.val ?? 0}</span>
                      <span className="text-sm font-bold text-slate-400 uppercase">{item.unit}</span>
                    </div>

                    <div
                      className="border-2 border-dashed border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group relative"
                      onClick={() => document.getElementById(`file-input-${item.id}`)?.click()}
                    >
                      {processingType === item.id ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                          <span className="text-[10px] font-bold text-green-600 uppercase">AI Analiz Ediyor...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-slate-300 mb-2 group-hover:text-green-600 transition-colors" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fatura Yükle</p>
                        </>
                      )}
                      <input
                        type="file"
                        id={`file-input-${item.id}`}
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(item.id as any, file);
                        }}
                      />
                    </div>

                    {/* Mini History Chart */}
                    <div className="pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Son 6 Ay Trendi</span>
                      </div>
                      <div className="h-20 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={item.data}>
                            <defs>
                              <linearGradient id={`grad-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={item.id === 'electricity' ? '#eab308' : item.id === 'water' ? '#3b82f6' : '#f97316'} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={item.id === 'electricity' ? '#eab308' : item.id === 'water' ? '#3b82f6' : '#f97316'} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={item.id === 'electricity' ? '#eab308' : item.id === 'water' ? '#3b82f6' : '#f97316'}
                              strokeWidth={2}
                              fillOpacity={1}
                              fill={`url(#grad-${item.id})`}
                            />
                            <XAxis dataKey="month" hide />
                            <YAxis hide />
                            <ChartTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }} labelStyle={{ display: 'none' }} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Logistics Tab */}
          <TabsContent value="logistics" className="mt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-3xl border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><Car className="w-4 h-4 text-green-600" /> Araç Tanımla</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-gray-400 uppercase">Marka / Model</Label>
                      <Input value={newVehicle.brand} onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })} placeholder="Ford Transit" className="rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-400 uppercase">Yakıt</Label>
                        <Select value={newVehicle.fuelType} onValueChange={(v) => setNewVehicle({ ...newVehicle, fuelType: v as any })}>
                          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diesel">Dizel</SelectItem>
                            <SelectItem value="gasoline">Benzin</SelectItem>
                            <SelectItem value="electric">Elektrik</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-400 uppercase">Motor Gücü (HP)</Label>
                        <Input type="number" value={newVehicle.hp} onFocus={handleFocus} onChange={(e) => setNewVehicle({ ...newVehicle, hp: e.target.value })} placeholder="0" className="rounded-xl" />
                      </div>
                    </div>
                    <Button onClick={() => {
                      if (!newVehicle.brand) return;
                      setCompanyData({ ...companyData, vehicleAssets: [...companyData.vehicleAssets, { id: Math.random().toString(), brand: newVehicle.brand, fuelType: newVehicle.fuelType, hp: Number(newVehicle.hp) || 0 }] });
                      setNewVehicle({ brand: "", fuelType: "diesel", hp: "" });
                    }} variant="outline" className="w-full rounded-xl font-bold">Aracı Filoya Ekle</Button>
                  </div>
                  <div className="pt-4 border-t space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Kayıtlı Filo</p>
                    <div className="max-h-[160px] overflow-y-auto space-y-1 pr-2">
                      {companyData.vehicleAssets.map(v => (
                        <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                          <span><strong>{v.brand}</strong> ({v.fuelType}, {v.hp} HP)</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={() => setCompanyData({ ...companyData, vehicleAssets: companyData.vehicleAssets.filter(x => x.id !== v.id) })}>
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md rounded-3xl bg-green-50/20">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><History className="w-4 h-4 text-green-600" /> Aylık Kullanım Gir</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Araç Seç</Label>
                    <Select value={vehicleUsage.vehicleId} onValueChange={(v) => setVehicleUsage({ ...vehicleUsage, vehicleId: v })}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Seçiniz">
                          {companyData.vehicleAssets.find(a => a.id === vehicleUsage.vehicleId)?.brand}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {companyData.vehicleAssets.map(v => (
                          <SelectItem key={v.id} value={v.id}>{v.brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Katedilen Mesafe (km)</Label>
                    <Input type="number" value={vehicleUsage.km} onFocus={handleFocus} onChange={(e) => setVehicleUsage({ ...vehicleUsage, km: e.target.value })} placeholder="0" className="rounded-xl" />
                  </div>
                  <Button onClick={() => {
                    if (!vehicleUsage.vehicleId || !vehicleUsage.km) return;
                    setCompanyData({ ...companyData, vehicleUsages: [{ id: Math.random().toString(), vehicleId: vehicleUsage.vehicleId, monthlyKm: Number(vehicleUsage.km) }, ...companyData.vehicleUsages] });
                    setVehicleUsage({ ...vehicleUsage, km: "" });
                  }} className="w-full bg-green-600 hover:bg-green-700 rounded-xl font-bold">Kullanımı Kaydet</Button>

                  <div className="pt-4 border-t space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Son Kullanım Kayıtları</p>
                    <div className="max-h-[160px] overflow-y-auto space-y-1 pr-2">
                      {companyData.vehicleUsages.map(u => {
                        const v = companyData.vehicleAssets.find(x => x.id === u.vehicleId);
                        return (
                          <div key={u.id} className="flex items-center justify-between p-3 bg-white border rounded-xl text-xs shadow-sm">
                            <span>{v?.brand || "---"} - <strong>{u.monthlyKm} km</strong></span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={() => setCompanyData({ ...companyData, vehicleUsages: companyData.vehicleUsages.filter(x => x.id !== u.id) })}>
                              <Minus className="w-3 h-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Machine Tab (Simplified Logic) */}
          <TabsContent value="machines" className="mt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-3xl border-none shadow-md">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Factory className="w-4 h-4 text-blue-600" /> Makine Tanımla</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Makine İsmi</Label>
                    <Input value={newMachine.name} onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })} placeholder="CNC Torna" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Güç (kW)</Label>
                    <Input type="number" value={newMachine.powerKw} onFocus={handleFocus} onChange={(e) => setNewMachine({ ...newMachine, powerKw: e.target.value })} placeholder="0" className="rounded-xl" />
                  </div>
                  <Button onClick={() => {
                    if (!newMachine.name) return;
                    setCompanyData({ ...companyData, machineAssets: [...companyData.machineAssets, { id: Math.random().toString(), name: newMachine.name, powerKw: Number(newMachine.powerKw) || 0 }] });
                    setNewMachine({ name: "", powerKw: "" });
                  }} variant="outline" className="w-full rounded-xl font-bold">Makinelere Ekle</Button>
                  <div className="pt-4 border-t space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Kayıtlı Makineler</p>
                    <div className="max-h-[160px] overflow-y-auto space-y-1 pr-2">
                      {companyData.machineAssets.map(m => (
                        <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                          <span><strong>{m.name}</strong> ({m.powerKw} kW)</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={() => setCompanyData({ ...companyData, machineAssets: companyData.machineAssets.filter(x => x.id !== m.id) })}>
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md rounded-3xl bg-blue-50/20">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><History className="w-4 h-4 text-blue-600" /> Aylık Çalışma Saati</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Makine Seç</Label>
                    <Select value={machineUsage.machineId} onValueChange={(v) => setMachineUsage({ ...machineUsage, machineId: v })}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Seçiniz">
                          {companyData.machineAssets.find(a => a.id === machineUsage.machineId)?.name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {companyData.machineAssets.map(m => (
                          <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Süre (Saat)</Label>
                    <Input type="number" value={machineUsage.hours} onFocus={handleFocus} onChange={(e) => setMachineUsage({ ...machineUsage, hours: e.target.value })} placeholder="0" className="rounded-xl" />
                  </div>
                  <Button onClick={() => {
                    if (!machineUsage.machineId || !machineUsage.hours) return;
                    setCompanyData({ ...companyData, machineUsages: [{ id: Math.random().toString(), machineId: machineUsage.machineId, hoursPerMonth: Number(machineUsage.hours) }, ...companyData.machineUsages] });
                    setMachineUsage({ ...machineUsage, hours: "" });
                  }} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold">Kullanımı Kaydet</Button>
                  <div className="pt-4 border-t space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Son Kullanım Kayıtları</p>
                    <div className="max-h-[160px] overflow-y-auto space-y-1 pr-2">
                      {companyData.machineUsages.map(u => {
                        const m = companyData.machineAssets.find(x => x.id === u.machineId);
                        return (
                          <div key={u.id} className="flex items-center justify-between p-3 bg-white border rounded-xl text-xs shadow-sm">
                            <span>{m?.name || "---"} - <strong>{u.hoursPerMonth} Saat</strong></span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={() => setCompanyData({ ...companyData, machineUsages: companyData.machineUsages.filter(x => x.id !== u.id) })}>
                              <Minus className="w-3 h-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Waste Tab */}
          <TabsContent value="waste" className="mt-6">
            <Card className="border-none shadow-md rounded-3xl bg-orange-50/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Plus className="w-4 h-4 text-orange-600" /> Yeni Atık Girişi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-gray-400">Atık Türü</Label>
                    <Select value={newWaste.type} onValueChange={(v) => setNewWaste({ ...newWaste, type: v as any })}>
                      <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastic">Plastik</SelectItem>
                        <SelectItem value="paper">Kağıt</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="glass">Cam</SelectItem>
                        <SelectItem value="hazardous">Tehlikeli</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-gray-400">Miktar (kg)</Label>
                    <Input type="number" value={newWaste.weightKg} onFocus={handleFocus} onChange={(e) => setNewWaste({ ...newWaste, weightKg: e.target.value })} placeholder="0" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-gray-400">Yöntem</Label>
                    <Select value={newWaste.disposalMethod} onValueChange={(v) => setNewWaste({ ...newWaste, disposalMethod: v as any })}>
                      <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recycle">Geri Dönüşüm</SelectItem>
                        <SelectItem value="landfill">Depolama</SelectItem>
                        <SelectItem value="incineration">Yakma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => {
                    if (!newWaste.weightKg) return;
                    setCompanyData({ ...companyData, wasteEntries: [{ id: Math.random().toString(), type: newWaste.type, weightKg: Number(newWaste.weightKg), disposalMethod: newWaste.disposalMethod }, ...companyData.wasteEntries] });
                    setNewWaste({ type: "plastic", weightKg: "", disposalMethod: "recycle" });
                  }} className="bg-orange-600 hover:bg-orange-700 rounded-xl font-bold h-10 px-6">Ekle</Button>
                </div>
                <div className="mt-8 space-y-3">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kayıtlı Atıklar</Label>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                    {companyData.wasteEntries.map((waste) => (
                      <div key={waste.id} className="p-4 border rounded-2xl bg-white flex items-center justify-between shadow-sm">
                        <div className="grid grid-cols-3 gap-8 flex-1">
                          <div><p className="text-[10px] text-gray-400 uppercase font-bold">Tür</p><p className="font-bold text-gray-900 capitalize text-sm">{waste.type}</p></div>
                          <div><p className="text-[10px] text-gray-400 uppercase font-bold">Ağırlık</p><p className="font-bold text-gray-900 text-sm">{waste.weightKg} kg</p></div>
                          <div><p className="text-[10px] text-gray-400 uppercase font-bold">Yöntem</p><p className="font-bold text-gray-900 capitalize text-xs">{waste.disposalMethod}</p></div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600" onClick={() => setCompanyData({ ...companyData, wasteEntries: companyData.wasteEntries.filter(w => w.id !== waste.id) })}>
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
