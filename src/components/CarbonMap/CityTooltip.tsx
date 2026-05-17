import React from 'react';
import { CityCarbonData } from '../../types/carbonMap';

interface CityTooltipProps {
  data: CityCarbonData;
  x: number;
  y: number;
}

export const CityTooltip: React.FC<CityTooltipProps> = ({ data, x, y }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-emerald-500';
      case 'medium': return 'text-amber-500';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div 
      className="fixed pointer-events-none z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl min-w-[200px]"
      style={{ left: x + 15, top: y + 15 }}
    >
      <h3 className="text-lg font-bold text-white mb-2">{data.city}</h3>
      
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">OSB Sayısı:</span>
          <span className="text-white font-medium">{data.osbCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Risk Skoru:</span>
          <span className={`font-bold ${getRiskColor(data.riskLevel)}`}>{data.riskScore}/100</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-slate-400">NO₂ Sinyali:</span>
          <span className="text-white whitespace-nowrap">
            {data.differencePercent > 0 ? '+' : ''}{data.differencePercent}%
          </span>
        </div>
        <div className="pt-1 mt-1 border-t border-slate-700/50">
          <span className={`text-xs font-semibold uppercase tracking-wider ${getRiskColor(data.riskLevel)}`}>
            {data.riskLevel === 'low' ? 'Düşük' : data.riskLevel === 'medium' ? 'Orta' : data.riskLevel === 'high' ? 'Yüksek' : 'Kritik'} Risk
          </span>
        </div>
      </div>
    </div>
  );
};
