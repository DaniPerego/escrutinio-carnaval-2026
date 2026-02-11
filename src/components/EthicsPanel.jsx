import React from 'react';
import { OBLIGACIONES_JURADO } from '../constants/data';
import { Shield, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';

const EthicsPanel = () => {
  const getIcon = (tipo) => {
    switch(tipo) {
      case 'prohibicion':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'obligacion':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'guia':
        return <BookOpen size={16} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getColorClass = (tipo) => {
    switch(tipo) {
      case 'prohibicion':
        return 'bg-red-900/20 border-red-500/30 hover:bg-red-900/30';
      case 'obligacion':
        return 'bg-green-900/20 border-green-500/30 hover:bg-green-900/30';
      case 'guia':
        return 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/30';
      default:
        return 'bg-slate-900/20 border-slate-500/30';
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border-t-4 border-purple-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/20 p-3 rounded-lg">
          <Shield size={24} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Ética y Obligaciones del Jurado</h3>
          <p className="text-sm text-slate-400">Manual del Jurado 2026 - Paso de los Libres</p>
        </div>
      </div>

      <div className="space-y-3">
        {OBLIGACIONES_JURADO.map((obligacion) => (
          <div 
            key={obligacion.id}
            className={`border rounded-lg p-4 transition-all ${getColorClass(obligacion.tipo)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIcon(obligacion.tipo)}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed flex-1">
                {obligacion.texto}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
        <p className="text-xs text-purple-300 italic leading-relaxed">
          💡 <strong>Recordatorio:</strong> El incumplimiento de estas obligaciones puede resultar en la 
          descalificación como jurado y penalizaciones según el reglamento administrativo del carnaval.
        </p>
      </div>
    </div>
  );
};

export default EthicsPanel;
