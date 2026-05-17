import React from 'react';
import { CityCarbonData } from '../../types/carbonMap';
import { Factory, Activity, AlertTriangle, ShieldCheck, TrendingUp, Info } from 'lucide-react';

interface CityDetailPanelProps {
  data: CityCarbonData | null;
}

export const CityDetailPanel: React.FC<CityDetailPanelProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl transition-all duration-500">
        <Activity className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4 animate-pulse" />
        <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400">Şehir Seçiniz</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-[200px] mt-2">
          Detaylı endüstriyel emisyon risk analizini görmek için haritadan bir ile tıklayın.
        </p>
      </div>
    );
  }

  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'low': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500', icon: ShieldCheck };
      case 'medium': return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-500', icon: Info };
      case 'high': return { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-500', icon: AlertTriangle };
      case 'critical': return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', icon: AlertTriangle };
      default: return { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-500', icon: Info };
    }
  };

  const styles = getRiskStyles(data.riskLevel);
  const StatusIcon = styles.icon;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className={`p-6 ${styles.bg} border-b ${styles.border}`}>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {data.city}
          </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles.bg} ${styles.text} border ${styles.border}`}>
            {data.riskLevel === 'low' ? 'DÜŞÜK' : data.riskLevel === 'medium' ? 'ORTA' : data.riskLevel === 'high' ? 'YÜKSEK' : 'KRİTİK'} RİSK
          </div>
        </div>
        <p className={`text-sm font-medium ${styles.text}`}>
          {data.status}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-1">
              <Factory className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">OSB Sayısı</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{data.osbCount}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Risk Skoru</span>
            </div>
            <p className={`text-xl font-bold ${styles.text}`}>{data.riskScore}/100</p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Uydu NO₂ Metrikleri
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">Şehir Sinyal Ortalaması</span>
              <span className="font-mono font-medium text-slate-900 dark:text-slate-200">{data.avgNO2.toFixed(6)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">Ulusal OSB Baseline</span>
              <span className="font-mono font-medium text-slate-900 dark:text-slate-200">{data.nationalAvgNO2.toFixed(6)}</span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Tutarlılık Farkı</span>
                <span className={`text-sm font-bold ${data.differencePercent > 0 ? styles.text : 'text-emerald-500'}`}>
                  {data.differencePercent > 0 ? '+' : ''}{data.differencePercent}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${data.differencePercent > 60 ? 'bg-red-500' : data.differencePercent > 30 ? 'bg-orange-500' : 'bg-amber-500'} transition-all duration-1000`}
                  style={{ width: `${Math.min(100, Math.max(0, data.differencePercent))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="p-4 bg-slate-900 dark:bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <StatusIcon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">AI Tavsiyesi</span>
          </div>
          <p className="text-sm text-slate-300 italic leading-relaxed">
            "{data.recommendation}"
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
        Veri kaynağı Sentinel-5P / Google Earth Engine entegrasyonuna hazırlandı.
      </div>
    </div>
  );
};
