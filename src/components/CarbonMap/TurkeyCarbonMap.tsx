"use client";

import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { osbCarbonMockData } from '../../data/osbCarbonMockData';
import { CityCarbonData, RiskLevel } from '../../types/carbonMap';
import { CityTooltip } from './CityTooltip';
import { CityDetailPanel } from './CityDetailPanel';
import { Info, Satellite, Factory, ShieldAlert } from 'lucide-react';

const GEO_URL = "/data/turkey-provinces.geojson";

export const TurkeyCarbonMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityCarbonData | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityCarbonData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [mounted, setSetMounted] = useState(false);

  useEffect(() => {
    setSetMounted(true);
  }, []);

  const getCityData = (cityName: string): CityCarbonData | null => {
    // Normalize city name if needed (e.g. Istanbul vs İstanbul)
    const normalized = cityName === "Istanbul" ? "İstanbul" : cityName;
    return osbCarbonMockData[normalized] || null;
  };

  const getFillColor = (cityName: string) => {
    const data = getCityData(cityName);
    if (!data) return "#cbd5e1"; // gray-300 fallback

    switch (data.riskLevel) {
      case 'low': return '#10b981';      // emerald-500
      case 'medium': return '#f59e0b';   // amber-500
      case 'high': return '#f97316';     // orange-500
      case 'critical': return '#ef4444'; // red-500
      default: return '#94a3b8';         // slate-400
    }
  };

  if (!mounted) return <div className="h-[600px] w-full bg-slate-100 dark:bg-slate-900 animate-pulse rounded-3xl" />;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Description Card */}
      <div className="bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <Satellite className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Endüstriyel Emisyon Risk Analitiği</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Green Carbon, sanayi bölgesi konumlarını uydu tabanlı <span className="font-semibold text-indigo-500">NO₂ sinyalleriyle</span> karşılaştırarak şehir bazlı bir emisyon risk göstergesi sağlar.
              <span className="block mt-1 font-medium text-slate-500 italic flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Bu doğrudan bir CO₂ ölçümü değil, Sentinel-5P entegrasyonu için hazırlanan bağımsız bir tutarlılık ve risk sinyalidir.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Map & Panel Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Map Container */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden relative group">
          <div className="absolute top-6 left-6 z-10 space-y-1">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Türkiye OSB Karbon Risk Haritası
            </h4>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
              İnteraktif Sanayi Yoğunluğu Gezgini
            </p>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Risk Yoğunluğu</h5>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Kritik', color: 'bg-red-500' },
                { label: 'Yüksek', color: 'bg-orange-500' },
                { label: 'Orta', color: 'bg-amber-500' },
                { label: 'Düşük', color: 'bg-emerald-500' },
                { label: 'Veri Yok', color: 'bg-slate-300' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-full min-h-[500px] flex items-center justify-center cursor-crosshair">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 2800,
                center: [35, 39],
              }}
              width={800}
              height={500}
              className="w-full h-full"
            >
              <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const cityName = geo.properties.name;
                      const data = getCityData(cityName);
                      const isSelected = selectedCity?.city === cityName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e) => {
                            if (data) {
                              setHoveredCity(data);
                              setTooltipPos({ x: e.clientX, y: e.clientY });
                            }
                          }}
                          onMouseMove={(e) => {
                            if (data) {
                              setTooltipPos({ x: e.clientX, y: e.clientY });
                            }
                          }}
                          onMouseLeave={() => setHoveredCity(null)}
                          onClick={() => setSelectedCity(data)}
                          style={{
                            default: {
                              fill: getFillColor(cityName),
                              outline: "none",
                              stroke: "#ffffff",
                              strokeWidth: 0.5,
                              transition: "all 300ms ease"
                            },
                            hover: {
                              fill: data ? "#4f46e5" : "#94a3b8", // indigo-600 on hover
                              outline: "none",
                              stroke: "#ffffff",
                              strokeWidth: 1.5,
                              cursor: data ? "pointer" : "default"
                            },
                            pressed: {
                              fill: "#4338ca",
                              outline: "none",
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Tooltip */}
          {hoveredCity && (
            <CityTooltip data={hoveredCity} x={tooltipPos.x} y={tooltipPos.y} />
          )}
        </div>

        {/* Detail Panel Container */}
        <div className="lg:col-span-4 h-full">
          <CityDetailPanel data={selectedCity} />
        </div>
      </div>
    </div>
  );
};
