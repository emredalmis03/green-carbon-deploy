import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/components/demo-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import PresentationWrapper from "@/components/PresentationWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Carbon - AI Destekli Karbon Yönetimi",
  description: "Yapay zeka destekli karbon ayak izi analizi ve yeşil dönüşüm danışmanı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <DemoProvider>
          <TooltipProvider>
            <PresentationWrapper>
              {children}
            </PresentationWrapper>
          </TooltipProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
