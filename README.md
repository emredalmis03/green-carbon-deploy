# 🌿 Green Carbon: AI-Powered Carbon Management for SMEs

![Green Carbon Banner](https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200&h=400)

**Green Carbon**, KOBİ'lerin yeşil dönüşüm süreçlerini ve karbon ayak izi yönetimlerini yapay zeka ile otomatize eden modern bir SaaS platformudur. Özellikle AB Yeşil Mutabakatı (Green Deal) ve SKDM (CBAM) süreçlerine uyum sağlamaya çalışan işletmeler için tasarlanmıştır.

## 🚀 Temel Özellikler

-   **🤖 AI Destekli Veri Girişi:** Faturaları (Elektrik, Su, Doğalgaz) OCR teknolojisi ile tarayıp tüketim verilerini anında işler.
-   **⚙️ Sanayi Analizi (Smart Assets):** Üretim bandındaki makinelerin enerji verimliliğini ölçer ve AI arama ile teknik değerleri otomatik tamamlar.
-   **♻️ Atık Yönetimi:** Atık türlerini sınıflandırır, geri dönüşüm potansiyelini ve emisyon etkisini hesaplar.
-   **🚚 Ulaşım & Lojistik:** Şirket filosu ve iş seyahatlerinden kaynaklanan Scope 1 ve Scope 3 emisyonlarını takip eder.
-   **📊 İleri Analitik & Grafikler:** Recharts ile trend analizi, kapsam (Scope) dağılımı ve sektörel karşılaştırma (Benchmark).
-   **💡 AI Strateji Önerileri:** Sektörel sıralamanızı yükseltmek ve emisyonları düşürmek için kişiselleştirilmiş aksiyon planları sunar.

## 🛠️ Teknoloji Yığını

-   **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), React 19
-   **Dil:** [TypeScript](https://www.typescriptlang.org/)
-   **Stil:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
-   **İkonlar:** [Lucide React](https://lucide.dev/)
-   **Grafikler:** [Recharts](https://recharts.org/)
-   **AI:** Gemini 1.5 Flash (Mocked in MVP)

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edin:

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```

3.  **Tarayıcıda Açın:**
    `http://localhost:3000`

## 📁 Proje Yapısı

```text
src/
├── app/              # Sayfa yapıları (Dashboard, Analiz, Öneriler, Ayarlar)
├── components/       # UI bileşenleri (Sidebar, Layout, Form elemanları)
├── data/             # Emisyon faktörleri ve sabit veriler
├── lib/              # Hesaplama motoru (calculations.ts) ve AI mock logic
└── hooks/            # Özel React hook'ları
```

## ⚖️ Lisans

Bu proje bir Ideathon MVP'si olarak geliştirilmiştir. Tüm hakları saklıdır.

---
*Green Carbon, KOBİ'nizin yeşil gelecekteki pusulası.*
Developed by **Tulpar Team**
