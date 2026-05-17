"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useDemo } from "@/components/demo-context";
import { useRouter } from "next/navigation";
import {
  Upload,
  File,
  X,
  Loader2,
  CheckCircle2,
  Database,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { processDocument, getDemoData } from "@/lib/mockOcr";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadPage() {
  const { setCompanyData } = useDemo();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startOcr = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 90 ? 90 : prev + 10));
    }, 300);

    try {
      // For demo, we just process the first file or merge them
      const data = await processDocument(files[0]);

      // If multiple files, merge mock data (just for demo)
      if (files.length > 1) {
        data.waterM3 = (data.waterM3 || 0) + 150;
        data.naturalGasM3 = (data.naturalGasM3 || 0) + 200;
      }

      data.productName = "Modern Mobilya A.Ş."; // Mock company name
      data.employeeCount = 35;

      setCompanyData(data);
      setProgress(100);
      clearInterval(interval);

      setTimeout(() => {
        router.push("/verify");
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      clearInterval(interval);
    }
  };

  const useDemoData = () => {
    const data = getDemoData();
    setCompanyData(data);
    router.push("/verify");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Belge Yükle</h1>
          <p className="text-gray-500">Faturalarınızı veya üretim raporlarınızı yükleyerek AI ile veri çıkarın.</p>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">İpucu</AlertTitle>
          <AlertDescription className="text-blue-700">
            JPG, PNG veya PDF formatında elektrik, su, doğalgaz faturalarınızı tek seferde yükleyebilirsiniz.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Dosya Yükleme</CardTitle>
              <CardDescription>Dosyaları sürükleyin veya seçin</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-4">
                  <Upload className="text-green-600 w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-gray-700">Dosya seçmek için tıklayın</p>
                <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (Maks 10MB)</p>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Yüklenecek Dosyalar ({files.length})</p>
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <File className="text-green-600 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(i)}>
                        <X className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 h-12"
                      disabled={isProcessing}
                      onClick={startOcr}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          AI ile Veriler Çıkarılıyor... {progress}%
                        </div>
                      ) : (
                        "AI ile Verileri Çıkar"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Demo Hızlı Giriş</CardTitle>
              <CardDescription>Dosya yüklemeden sistemi test edin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Elinizde hazır fatura yoksa, önceden hazırlanmış kapsamlı bir KOBİ veri setini kullanarak analizi görebilirsiniz.
              </p>
              <Button
                variant="outline"
                className="w-full border-green-600 text-green-700 hover:bg-green-50 gap-2 h-12"
                onClick={useDemoData}
              >
                <Database className="w-4 h-4" />
                Demo Veri Kullan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-green-100 rounded-full" />
                <div
                  className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"
                  style={{ animationDuration: '1.5s' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Upload className="text-green-600 w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Belgeleriniz İşleniyor</h3>
              <p className="text-gray-600 mb-8">
                Yapay zeka modellerimiz faturalarınızdaki tüketim değerlerini ve birim fiyatları analiz ediyor.
              </p>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm font-medium text-green-700 mt-4">
                {progress < 40 ? "Belge taraması yapılıyor..." : progress < 80 ? "Veriler sınıflandırılıyor..." : "Analiz sonuçları hazırlanıyor..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
