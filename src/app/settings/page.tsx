"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Building2, Target, Globe, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-500">Proje ve şirket bazlı yapılandırmaları yönetin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Company Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-green-600" />
                <CardTitle>Şirket Profili</CardTitle>
              </div>
              <CardDescription>Raporlarda görünecek resmi şirket bilgileri.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Resmi Firma Adı</Label>
                <Input placeholder="Eko-Tekstil Sanayi Tic. A.Ş." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sektör</Label>
                  <Select defaultValue="textile">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="textile">Tekstil</SelectItem>
                      <SelectItem value="metal">Metal & Maden</SelectItem>
                      <SelectItem value="food">Gıda</SelectItem>
                      <SelectItem value="automotive">Otomotiv Yan Sanayi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vergi No</Label>
                  <Input placeholder="1234567890" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Goals */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <CardTitle>Yıllık Hedefler</CardTitle>
              </div>
              <CardDescription>2026 yılı yeşil dönüşüm hedeflerinizi belirleyin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Karbon Azaltım Hedefi (%)</Label>
                <Input type="number" placeholder="20" />
              </div>
              <div className="space-y-2">
                <Label>Yenilenebilir Enerji Oranı Hedefi (%)</Label>
                <Input type="number" placeholder="40" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
                Hedefleri Kaydet
              </Button>
            </CardContent>
          </Card>

          {/* Compliance Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
                <CardTitle>Uyumluluk & Standartlar</CardTitle>
              </div>
              <CardDescription>Hesaplama metodolojisi ve raporlama standartları.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Emisyon Faktörü Veri Seti</Label>
                <Select defaultValue="ghg">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ghg">GHG Protocol (Standard)</SelectItem>
                    <SelectItem value="ipcc">IPCC 2006</SelectItem>
                    <SelectItem value="defra">DEFRA UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Raporlama Para Birimi</Label>
                <Select defaultValue="eur">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="try">TL (₺)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dolar ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Integration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <CardTitle>Dış Entegrasyonlar</CardTitle>
              </div>
              <CardDescription>ERP ve Sensör verilerini bağlayın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-dashed rounded-lg flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-gray-500">SAP / Oracle ERP Entegrasyonu</p>
                <Button variant="outline" size="sm" disabled>Bağlan</Button>
              </div>
              <div className="p-4 border border-dashed rounded-lg flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-gray-500">IoT Enerji Analizörü Bağla</p>
                <Button variant="outline" size="sm" disabled>Cihaz Ekle</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
