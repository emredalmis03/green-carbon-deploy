"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe,
  LineChart,
  PieChart,
  ArrowRight,
  X,
  Satellite,
  Cpu,
  Target,
  TrendingDown,
  Activity,
  Layers,
  Leaf
} from "lucide-react";

interface SlideData {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const PresentationWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const introSeen = sessionStorage.getItem("introSeen");
    if (introSeen === "true") {
      setShowIntro(false);
    } else {
      setShowIntro(true);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("introSeen", "true");
    setShowIntro(false);
    document.body.style.overflow = "unset";
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slides: SlideData[] = [
    {
      title: "Biz Kimiz?",
      subtitle: "Green Carbon",
      content: (
        <div className="space-y-6 flex flex-col items-center">
          <p className="text-white text-xl md:text-2xl font-bold text-center leading-relaxed">
            "Karbon emisyonunu azaltarak şirketlerin dış dünyaya açılmasını sağlıyoruz, peki ama nasıl?"
          </p>
          <div className="grid grid-cols-4 gap-4 w-full pt-4">
            {["SDG-7.png", "SDG-9.png", "SDG-11.png", "SDG-13.png"].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-2 hover:bg-white/10 transition-colors"
              >
                <img src={`/images/${img}`} alt={`SDG ${img}`} className="w-full h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Problem",
      subtitle: "İhracatta Karbon Engeli",
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-md">
            <Activity className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">İhracat Riski</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                Orta ölçekli şirketlerin özellikle AB karbon emisyonu kısıtlamaları sebebiyle ihracat yapamamaları.
              </li>
              <li className="flex items-start gap-3 text-white/70 text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                10.8 milyar dolarlık ihracat doğrudan etkileniyor (Ticaret Bakanlığı verileri).
              </li>
              <li className="flex items-start gap-3 text-white/70 text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                2040'a kadar 60 milyar doları aşan dolaylı etkilenme riski.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Çözüm",
      subtitle: "Karbon Analizi & Uyum",
      content: (
        <div className="space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-[#39FF14]/5 border border-[#39FF14]/20 backdrop-blur-md">
            <Zap className="w-12 h-12 text-[#39FF14] mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Stratejik Hedef</h3>
            <p className="text-white/80 text-lg leading-relaxed italic">
              "Karbon emisyonuna sebep olan etkenleri tespit etmek ve bunları azaltarak ihracata uygun ortam oluşturmak."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Adım 1",
      subtitle: "Veri Girişi",
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Sisteme Veri Yükleme</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { t: "Faturalar", d: "Elektrik, su, doğalgaz faturaları" },
                { t: "Lojistik", d: "Ulaşım ve lojistik araçları" },
                { t: "Altyapı", d: "Kullanılan sanayi altyapısı" },
                { t: "Geri Dönüşüm", d: "Geri dönüşüm değerleri" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-[#39FF14] text-sm font-bold mb-1">{item.t}</h4>
                  <p className="text-white/40 text-xs">{item.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-white/60 text-sm italic text-center">
              "Tüm bu veriler Green Carbon'a tanımlanır."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Adım 2",
      subtitle: "LLM Analizi",
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14] mb-6">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Zeka Devreye Giriyor</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mt-2 shrink-0" />
                <p className="text-white/80 text-base">LLM devreye girerek toplam karbon emisyonunu hesaplar.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mt-2 shrink-0" />
                <p className="text-white/80 text-base">Sektörel karşılaştırmalar yapar.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mt-2 shrink-0" />
                <p className="text-white/80 text-base">Karbon emisyonuna sebep olan etkenleri daha net görmemizi sağlar.</p>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Adım 3",
      subtitle: "Green AI Önerileri",
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14] mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Stratejik Öneriler</h3>
            <p className="text-white/80 text-base mb-6">
              Tüm bu verileri analiz eden Green AI, şirket sahibine karbon emisyonunu nasıl azaltacağına dair detaylı öneriler sunar.
            </p>
            <div className="p-4 rounded-2xl bg-[#39FF14]/10 border border-[#39FF14]/20">
              <p className="text-[#39FF14] text-sm font-bold text-center">
                "Aynı zamanda bu durumun mali olumlu etkilerini gösterir."
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pazar",
      subtitle: "Rakip Karşılaştırması",
      content: (
        <div className="w-full flex flex-col items-center">
          <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
            <table className="w-full text-left text-[11px] md:text-sm">
              <thead>
                <tr className="bg-white/5 text-white/60">
                  <th className="px-4 py-4 font-bold border-b border-white/10">Şirket / Çözüm</th>
                  <th className="px-4 py-4 font-bold border-b border-white/10 text-center">AB Karbon Uyumu</th>
                  <th className="px-4 py-4 font-bold border-b border-white/10 text-center">Hesaplama</th>
                  <th className="px-4 py-4 font-bold border-b border-white/10 text-center">AI / Otom.</th>
                  <th className="px-4 py-4 font-bold border-b border-white/10 text-center">Senaryo</th>
                  <th className="px-4 py-4 font-bold border-b border-white/10 text-center">KOBİ/OSB</th>
                  <th className="px-4 py-4 font-bold border-b border-white/10 text-center">Uydu Doğr.</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "Green Carbon", c1: true, c2: true, c3: true, c4: true, c5: true, c6: true },
                  { n: "CarbonSmart", c1: true, c2: true, c3: true, c4: false, c5: false, c6: false },
                  { n: "Carbon Gate", c1: true, c2: true, c3: true, c4: false, c5: false, c6: false },
                  { n: "3pmetrics", c1: true, c2: true, c3: false, c4: true, c5: false, c6: false },
                  { n: "Semtrio", c1: true, c2: true, c3: false, c4: false, c5: false, c6: false },
                  { n: "Metsims", c1: false, c2: true, c3: false, c4: false, c5: false, c6: false }
                ].map((row, i) => (
                  <tr key={i} className={`${row.n === "Green Carbon" ? "bg-[#39FF14]/10 text-white" : "text-white/60"} border-b border-white/5`}>
                    <td className="px-4 py-4 font-bold whitespace-nowrap">{row.n}</td>
                    <td className="px-4 py-4 text-center">{row.c1 ? "✓" : "—"}</td>
                    <td className="px-4 py-4 text-center">{row.c2 ? "✓" : "—"}</td>
                    <td className="px-4 py-4 text-center">{row.c3 ? "✓" : "—"}</td>
                    <td className="px-4 py-4 text-center">{row.c4 ? "✓" : "—"}</td>
                    <td className="px-4 py-4 text-center">{row.c5 ? "✓" : "—"}</td>
                    <td className="px-4 py-4 text-center">{row.c6 ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[#39FF14] text-xs md:text-sm font-bold text-center">
            "Green Carbon, karbon hesaplamanın ötesine geçerek KOBİ ve OSB’lere uydu destekli bağımsız doğrulama sunar."
          </p>
        </div>
      ),
    },
    {
      title: "Hedef Kitle",
      subtitle: "Kritik Paydaşlar",
      content: (
        <div className="grid grid-cols-1 gap-3">
          {[
            { t: "İhracatçı Şirketler", d: "AB'ye ihracat yapan KOBİ'ler", i: <Globe className="w-5 h-5" /> },
            { t: "OSB Firmaları", d: "Organize Sanayi Bölgesi sakinleri", i: <Layers className="w-5 h-5" /> },
            { t: "Sanayi Odaları", d: "Yönetsel ve stratejik partnerler", i: <ShieldCheck className="w-5 h-5" /> },
            { t: "Uluslararası Firmalar", d: "Büyümekte olan global aktörler", i: <Zap className="w-5 h-5" /> },
            { t: "Teknokentler", d: "İnovasyon odaklı teknoloji şirketleri", i: <Cpu className="w-5 h-5" /> }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14]">
                {item.i}
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">{item.t}</h4>
                <p className="text-white/40 text-xs">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "İş Modeli",
      subtitle: "SaaS & Abonelik",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              { t: "B2B Satış Modeli", d: "Doğrudan kurumsal satış ve partner kanalları" },
              { t: "Abonelik Sistemi", d: "Esnek Aylık veya Yıllık SaaS ödeme planları" },
              { t: "Lisans Tanımlama", d: "Firmaya özel modüler yetkilendirme" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-[#39FF14] text-sm font-bold mb-1 uppercase tracking-wider">{item.t}</h4>
                <p className="text-white/60 text-xs">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Fırsat",
      subtitle: "Ekosistem & Destek",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { n: "AB", img: "ab.jpg" },
              { n: "UN", img: "un.png" },
              { n: "AKA", img: "aka.png" },
              { n: "KOSGEB", img: "kosgeb.png" },
              { n: "Bakanlık", img: "ticaret_bakanligi.png" }
            ].map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-white rounded-xl flex items-center justify-center p-3 hover:grayscale-0 transition-all"
              >
                <img src={`/images/${logo.img}`} alt={logo.n} className="max-h-full max-w-full object-contain" />
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-white/40 text-center uppercase tracking-widest font-bold">Resmi Kurum & Uluslararası Fon Destekleri</p>
        </div>
      ),
    },
    {
      title: "Yol Haritası",
      subtitle: "Büyüme Planı",
      content: (
        <div className="relative pl-10 space-y-8 py-4">
          <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-[#39FF14]/20" />
          {[
            "MVP Geliştirme",
            "Alfa Test Süreci",
            "Beta Kullanıcı Testi",
            "Ürün İyileştirme",
            "Pazar Doğrulama & İş Modeli",
            "Yatırım & Ölçekleme"
          ].map((step, i) => (
            <div key={i} className="relative flex items-center gap-6">
              <div className="absolute -left-[36px] w-[18px] h-[18px] rounded-full bg-[#050505] border-2 border-[#39FF14] z-10 shadow-[0_0_10px_#39FF1444]" />
              <span className="text-white text-lg md:text-2xl font-bold tracking-tight">{i + 1}. {step}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Sonuç",
      subtitle: "Özet & Değer Önerisi",
      content: (
        <div className="space-y-3">
          {[
            "Yapay zeka destekli yenilikçi sürdürülebilirlik platformu.",
            "KOBİ'lerin AB karbon regülasyonlarına tam uyumu.",
            "Detaylı karbon analizi, ölçüm ve raporlama.",
            "Stratejik azaltım senaryoları ve detaylı öneriler.",
            "Maliyet avantajı ve güçlenen ihracat süreçleri."
          ].map((text, i) => (
            <div key={i} className="flex gap-4 items-center p-4 rounded-xl bg-[#39FF14]/5 border border-[#39FF14]/10">
              <ShieldCheck className="w-5 h-5 text-[#39FF14] shrink-0" />
              <p className="text-white text-xs md:text-sm font-medium">{text}</p>
            </div>
          ))}
          {/* Demoyu Keşfet butonu navigasyon alanına taşındı */}
        </div>
      ),
    },
  ];

  if (showIntro === null) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden font-sans"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#39FF14]/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-[#39FF14]/5 blur-[180px] rounded-full" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#39FF14 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
            </div>

            {/* Content Container */}
            <div className="relative w-full max-w-6xl px-4 md:px-12 h-screen max-h-screen flex flex-col items-center justify-between py-4 md:py-8 overflow-hidden">

              {/* Header */}
              <div className="w-full flex justify-between items-center shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#39FF14] flex items-center justify-center text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                    <Leaf className="w-6 h-6 fill-current" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-white tracking-tighter leading-none">Green <span className="text-[#39FF14]">Carbon</span></span>
                    <span className="text-[7px] font-mono text-white/40 tracking-[0.2em] uppercase mt-0.5">Carbon Intelligence</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-mono text-white/30">
                  <span className="text-[#39FF14] font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <div className="w-10 md:w-20 h-[1px] bg-white/10 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-[#39FF14]"
                      animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    />
                  </div>
                  <span>{String(slides.length).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Slide Content */}
              {slides[currentSlide].subtitle === "Rakip Karşılaştırması" ? (
                <div className="w-full flex flex-col gap-6 flex-1 min-h-0 overflow-hidden z-20 my-4">
                  {/* Title Area for Full Width */}
                  <div className="space-y-4 text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none"
                    >
                      {slides[currentSlide].title}
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 mx-auto"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                      <span className="text-[#39FF14] text-xs md:text-sm font-bold tracking-widest uppercase">{slides[currentSlide].subtitle}</span>
                    </motion.div>


                  </div>

                  {/* Full Width Content */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col relative group min-h-0 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#39FF14]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 overflow-y-auto max-h-[55vh] lg:max-h-[65vh] no-scrollbar">
                      {slides[currentSlide].content}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-4 lg:gap-16 items-start flex-1 min-h-0 overflow-hidden z-20 my-4">

                  {/* Left Side: Titles */}
                  <div className="space-y-2 md:space-y-4 flex flex-col pt-4 md:pt-8 lg:pt-10">
                    <div className="space-y-2 md:space-y-3">
                      <motion.h2
                        key={`title-${currentSlide}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]"
                      >
                        {slides[currentSlide].title.split(' ').map((word, i) => (
                          <span key={i} className="block last:text-[#39FF14] last:drop-shadow-[0_0_10px_#39FF1444]">{word}</span>
                        ))}
                      </motion.h2>

                      <motion.div
                        key={`badge-${currentSlide}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                        <span className="text-[#39FF14] text-xs md:text-sm font-bold tracking-widest uppercase">{slides[currentSlide].subtitle}</span>
                      </motion.div>
                    </div>


                  </div>

                  {/* Right Side: Visual Content */}
                  <motion.div
                    key={`content-${currentSlide}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/[0.02] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 lg:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col relative group min-h-0 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#39FF14]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 overflow-y-auto max-h-[45vh] lg:max-h-[65vh] no-scrollbar">
                      {slides[currentSlide].content}
                    </div>
                  </motion.div>

                </div>
              )}

              {/* Navigation & Progress Area */}
              <div className="w-full flex flex-col items-center gap-6 shrink-0 z-30 pb-4">
                {/* Fixed Navigation Buttons */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={`group w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${currentSlide === 0 ? 'opacity-10 border-white/10 cursor-not-allowed' : 'border-white/10 hover:border-[#39FF14] text-white hover:bg-[#39FF14]/5'}`}
                  >
                    <ChevronLeft className={`w-6 h-6 transition-transform group-hover:-translate-x-1 ${currentSlide === 0 ? '' : 'group-hover:text-[#39FF14]'}`} />
                  </button>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-10 bg-[#39FF14] shadow-[0_0_15px_#39FF14]' : 'w-2 bg-white/10 hover:bg-white/20'}`}
                      />
                    ))}
                  </div>

                  {currentSlide === slides.length - 1 ? (
                    <button
                      onClick={handleFinish}
                      className="group px-6 h-12 rounded-2xl border border-[#39FF14] text-[#39FF14] bg-[#39FF14]/10 hover:bg-[#39FF14]/20 transition-all duration-300 flex items-center gap-3 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-[0_0_20px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                      demoyu keşfet
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={nextSlide}
                      className="group w-12 h-12 rounded-2xl border border-[#39FF14] text-[#39FF14] bg-[#39FF14]/10 hover:bg-[#39FF14]/20 transition-all duration-300 flex items-center justify-center"
                    >
                      <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>

              {/* Skip Button */}
              <button
                onClick={handleFinish}
                className="absolute top-4 right-4 p-2 text-white/10 hover:text-[#39FF14] transition-all hover:scale-110 z-30"
              >
                <X className="w-5 h-5" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Site Content */}
      <div className={showIntro ? "hidden" : "contents"}>
        {children}
      </div>
    </>
  );
};

export default PresentationWrapper;
