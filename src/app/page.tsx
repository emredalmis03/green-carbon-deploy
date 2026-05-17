"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowRight,
  Upload,
  Factory,
  Truck,
  Recycle,
  Globe,
  Droplets,
  Flame,
  FileText,
  Users,
  Navigation,
  Hash,
  CheckCircle2,
  BrainCircuit,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LandingPage() {
  const [showKVKK, setShowKVKK] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Header */}
      <header className="px-8 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Green <span className="text-green-600">Carbon</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors">Nasıl Çalışır?</Link>
          <Link href="#features" className="text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors">Özellikler</Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="font-bold text-slate-600">Giriş Yap</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 shadow-xl shadow-green-200/50">Hemen Başla</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Left */}
          <div className="text-left space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-4">
              <h1 className="text-7xl font-black text-slate-900 leading-tight tracking-tighter">
                Green <br />
                <span className="text-green-600">Carbon</span>
              </h1>
              <h2 className="text-2xl font-bold text-slate-700 leading-snug">
                KOBİ’ler için AI destekli karbon ayak izi ve <br />
                SKDM hazırlık platformu
              </h2>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                Elektrik, su, doğalgaz, yakıt, lojistik ve üretim belgelerinizi yükleyin.
                Green AI verileri analiz etsin, karbon ayak izinizi hesaplasın, SKDM riskinizi göstersin
                ve size özel yeşil dönüşüm önerileri sunsun.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-green-200 group">
                  Analize Başla
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold border-2 border-slate-200 hover:bg-slate-50">
                  Demo Verilerle Dene
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right: Dashboard Preview */}
          <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-200">
            <Card className="border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] rounded-[32px] overflow-hidden bg-white p-8 space-y-8 border-t-8 border-t-green-600">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toplam Karbon Ayak İzi</p>
                  <p className="text-3xl font-black text-slate-900">18.4 <span className="text-sm font-medium text-slate-400">ton CO₂e</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKDM Risk Skoru</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-[70%]" />
                    </div>
                    <span className="text-xs font-bold text-orange-600">Orta-Yüksek</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Zap className="text-yellow-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">En Büyük Kaynak</p>
                    <p className="text-sm font-bold text-slate-900">Elektrik</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Yeşil Dönüşüm Skoru</p>
                    <p className="text-sm font-bold text-slate-900">76/100</p>
                  </div>
                </div>
              </div>

              {/* Mini Charts Preview */}
              <div className="space-y-3 pt-6">
                <div className="flex justify-between items-end gap-2 h-16">
                  <div className="w-full bg-green-500/20 rounded-t-lg h-[40%] flex items-end justify-center pb-1"><span className="text-[8px] font-bold text-green-700">S1</span></div>
                  <div className="w-full bg-blue-500/20 rounded-t-lg h-[80%] flex items-end justify-center pb-1"><span className="text-[8px] font-bold text-blue-700">S2</span></div>
                  <div className="w-full bg-orange-500/20 rounded-t-lg h-[60%] flex items-end justify-center pb-1"><span className="text-[8px] font-bold text-orange-700">S3</span></div>
                </div>
              </div>

              {/* AI Bubble */}
              <div className="bg-slate-900 rounded-2xl p-4 flex gap-4 items-start relative mt-4 shadow-xl">
                <div className="w-8 h-8 bg-green-500 rounded-full shrink-0 flex items-center justify-center">
                  <BrainCircuit className="text-white w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Green AI</p>
                  <p className="text-xs text-white leading-relaxed">
                    "Elektrik tüketiminiz toplam emisyonun en büyük kaynağı görünüyor. Çatı GES yatırımı öncelikli olabilir."
                  </p>
                </div>
              </div>
            </Card>

            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-200/30 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200/30 rounded-full blur-[80px] -z-10" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-20 tracking-tight">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Upload, title: "Belgeleri Yükle", desc: "Elektrik, su, doğalgaz, yakıt, lojistik ve üretim belgelerini sisteme yükleyin.", color: "bg-green-50 text-green-600" },
              { icon: BrainCircuit, title: "Green AI Analiz Etsin", desc: "AI belgelerden verileri çıkarır, eksikleri gösterir ve karbon/su/enerji metriklerini hesaplar.", color: "bg-blue-50 text-blue-600" },
              { icon: BarChart3, title: "Rapor ve Önerileri Gör", desc: "SKDM riskinizi, en büyük emisyon kaynağınızı, tasarruf önerilerinizi ve teşvik eşleştirmelerinizi görün.", color: "bg-orange-50 text-orange-600" },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="flex flex-col items-center space-y-6">
                  <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden lg:block absolute top-10 -right-6 w-12 h-px bg-slate-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-20 text-center tracking-tight">Özellikler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Karbon Ayak İzi", desc: "Scope 1, Scope 2 ve Scope 3 emisyonlarını sade şekilde hesaplar.", bg: "bg-green-600" },
              { icon: ShieldCheck, title: "SKDM / CBAM Risk Analizi", desc: "GTİP / HS Code ve ihracat bilgilerine göre ön risk değerlendirmesi sunar.", bg: "bg-blue-600" },
              { icon: MessageSquare, title: "Green AI Önerileri", desc: "En büyük emisyon kaynağını bulur; azaltım, tasarruf ve geri ödeme süresi önerileri üretir.", bg: "bg-orange-600" },
              { icon: Zap, title: "Teşvik Eşleştirme", desc: "Firmanın ihtiyacına göre GES, enerji verimliliği, atık su veya makine modernizasyonu desteklerini önerir.", bg: "bg-slate-900" },
            ].map((feature, i) => (
              <Card key={i} className="p-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem]">
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200`}>
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Grid Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Üreticiden Alınan Veriler</h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
              Green Carbon, üreticinin mevcut belgelerini ve temel operasyon verilerini kullanarak karbon, su, enerji ve SKDM analizleri üretir.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Zap, label: "Elektrik faturası" },
              { icon: Droplets, label: "Su faturası" },
              { icon: Flame, label: "Doğalgaz faturası" },
              { icon: Navigation, label: "Yakıt faturaları" },
              { icon: Truck, label: "Nakliye faturaları" },
              { icon: FileText, label: "Ürün listesi" },
              { icon: BarChart3, label: "Üretim miktarı" },
              { icon: Factory, label: "Makine süresi" },
              { icon: Users, label: "Çalışan sayısı" },
              { icon: Navigation, label: "Ulaşım şekli" },
              { icon: Hash, label: "GTİP / HS Code" },
              { icon: Globe, label: "Lojistik faturaları" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors gap-3">
                <item.icon className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-600 uppercase text-center tracking-tighter">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Green AI Assistant Section */}
      <section className="py-32 px-6 bg-green-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              <span>Yapay Zeka Destekli Danışmanlık</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter leading-[0.9]">Green AI <br />Asistanı</h2>
            <p className="text-xl text-green-50 leading-relaxed max-w-lg font-medium">
              Green, yüklediğiniz belgelerden verileri çıkarır, eksik alanları gösterir ve işletmeniz için uygulanabilir yeşil dönüşüm önerileri üretir.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Bu veri eksik olduğu için SKDM risk skorunu tahmini hesapladım.",
              "Doğalgaz kaynaklı emisyonu azaltmak için kazan verimliliği kontrol edilmeli.",
              "Çatı GES yatırımı bu işletme için yüksek öncelikli bir öneri olabilir."
            ].map((msg, i) => (
              <div key={i} className={`flex items-start gap-4 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:translate-x-2 ${i === 1 ? 'ml-8' : i === 2 ? 'ml-16' : ''}`}>
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <BrainCircuit className="text-green-600 w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-white leading-relaxed">{msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      </section>

      {/* Footer / Legal */}
      <footer className="py-20 px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-100">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Green <span className="text-green-600">Carbon</span></span>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Önemli Not</p>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed font-medium">
              Green Carbon ön analiz ve karar destek platformudur. Resmi karbon doğrulama veya yasal uygunluk belgesi yerine geçmez.
            </p>
          </div>

          <div className="pt-12 border-t border-slate-50 w-full flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            <span>© 2026 Green Carbon. All Rights Reserved.</span>
            <div className="flex gap-8">
              <span
                onClick={() => setShowKVKK(true)}
                className="hover:text-green-600 cursor-pointer transition-colors"
              >
                KVKK Aydınlatma Metni
              </span>
            </div>
          </div>
        </div>
      </footer>
      {/* KVKK Modal */}
      <Dialog open={showKVKK} onOpenChange={setShowKVKK}>
        <DialogContent className="max-w-[95vw] lg:max-w-[1200px] max-h-[85vh] overflow-hidden flex flex-col p-0 rounded-[2.5rem] border-none shadow-2xl">
          <DialogHeader className="p-8 md:p-12 pb-6 bg-green-600">
            <DialogTitle className="text-3xl md:text-4xl font-black text-white">KVKK Aydınlatma Metni</DialogTitle>
            <DialogDescription className="text-green-50/80 font-medium text-lg">
              Verilerinizin güvenliği ve işlenme süreçleri hakkında bilgilendirme.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-8 md:p-12 pt-8 scrollbar-thin scrollbar-thumb-green-600/20 scrollbar-track-transparent">
            <div className="space-y-8 text-slate-600 text-base leading-relaxed pb-12">
              <section className="space-y-4">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_10px_#16a34a]" />
                  1. Veri Sorumlusu
                </h4>
                <p>
                  Green Carbon platformu, sürdürülebilirlik ve karbon ayak izi yönetimi kapsamında kullanıcılar tarafından paylaşılan verilerin işlenmesinden sorumludur.
                </p>
              </section>

              <section className="space-y-4">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_10px_#16a34a]" />
                  2. Toplanan Veriler ve İşleme Amacı
                </h4>
                <p>Platformumuz üzerinden toplanan aşağıdaki veriler belirtilen amaçlarla işlenmektedir:</p>
                <ul className="list-disc pl-6 space-y-3 text-slate-500">
                  <li><strong>Operasyonel Veriler:</strong> Elektrik, su, doğalgaz, yakıt ve lojistik faturaları; ürün listeleri ve üretim miktarları.</li>
                  <li><strong>Kurumsal Bilgiler:</strong> Çalışan sayısı, makine envanteri ve GTİP/HS kodları.</li>
                  <li><strong>Amaç:</strong> Karbon ayak izi (Scope 1, 2, 3) hesaplaması, SKDM (CBAM) uyum risk analizi ve yapay zeka destekli yeşil dönüşüm önerileri sunulması.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_10px_#16a34a]" />
                  3. Yapay Zeka ile Veri İşleme
                </h4>
                <p>
                  Yüklenen belgelerdeki veriler, Green AI (Google Gemini LLM altyapısı) kullanılarak otomatik olarak çıkarılmakta ve analiz edilmektedir. Bu işlem tamamen teknik analiz ve raporlama amacı taşımaktadır.
                </p>
              </section>

              <section className="space-y-4">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_10px_#16a34a]" />
                  4. Veri Güvenliği ve Saklama
                </h4>
                <p>
                  Verileriniz uçtan uca şifreleme ile korunmakta ve yalnızca size özel analizlerin üretilmesi için kullanılmaktadır. Üçüncü taraflarla pazarlama amacıyla paylaşılmamaktadır.
                </p>
              </section>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-400 text-center">
                Bu metin Green Carbon platformunun güncel veri politikalarını yansıtmaktadır.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
