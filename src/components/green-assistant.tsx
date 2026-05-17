"use client";

import React from "react";
import Image from "next/image";
import { useDemo } from "@/components/demo-context";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GreenAssistantProps {
  page?: "dashboard" | "verify" | "recommendations" | "analysis";
}

export function GreenAssistant({ page = "dashboard" }: GreenAssistantProps) {
  const { aiAnalysis, results, companyData } = useDemo();
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  // Mock messages based on data
  const getMessage = () => {
    if (!results) return "Hoş geldiniz! Analize başlamak için lütfen belgelerinizi yükleyin.";
    
    if (page === "verify") {
      const missingCount = results.missingData.length;
      return missingCount > 0 
        ? `${missingCount} alanda veri eksik görünüyor. SKDM risk skorunu daha doğru hesaplamam için bu alanları doldurabilir misin?`
        : "Tüm veriler tamam! Şimdi analizi başlatarak işletmenizin karbon profilini görebiliriz.";
    }

    if (aiAnalysis) {
      if (page === "dashboard") {
        return `${aiAnalysis.largestEmissionSource} emisyonlarınızın %${((results.scope2Kg / results.totalCarbonKg) * 100).toFixed(0)}'sini oluşturuyor. Bir göz atmalıyız.`;
      }
      if (page === "recommendations") {
        return "Sizin için en yüksek verimlilik sağlayacak 3 kritik yatırım planladım. Çatı GES en hızlı geri dönüşü sağlayacak olanı.";
      }
    }

    return "İşletmenizin yeşil dönüşüm yolculuğunda size rehberlik etmek için buradayım.";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[100] max-w-sm"
      >
        <Card className="bg-white/90 backdrop-blur-md border-green-100 shadow-2xl relative overflow-visible">
          <div className="absolute -top-12 -right-4 w-20 h-20 drop-shadow-xl">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20 scale-110" />
              <Image 
                src="/green-mascot.png" // We'll need to copy the generated image here
                alt="Green Mascot"
                width={80}
                height={80}
                className="relative z-10 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          
          <CardContent className="p-6 pr-12">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sparkles className="text-green-600 w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Green AI Asistan</p>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  "{getMessage()}"
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
