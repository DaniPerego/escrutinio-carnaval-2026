import React, { useState } from 'react';
import { useScoring } from '../context/ScoringContext';
import { COMPARSAS, RUBROS } from '../constants/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, AlertTriangle, CheckCircle2, Trophy, TrendingUp, Info } from 'lucide-react';
import EthicsPanel from '../components/EthicsPanel';

const JudgeConsole = () => {
  const { addScore, state, getTotalScore, getPuntajeNeto, getSancion } = useScoring();
  
  const [formData, setFormData] = useState({
    noche: 'noche1',
    jurado: 'jurado1',
    comparsaId: COMPARSAS[0].id,
    rubroId: RUBROS[0].id,
    score: '',
    justification: ''
  });

  const [uiState, setUiState] = useState({
    error: null,
    success: false,
    needsJustification: false
  });

  const validateScore = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return false;
    return num >= 5.0 && num <= 10.0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-detección para justificación
    if (name === 'score') {
        const num = parseFloat(value);
        const needsJust = !isNaN(num) && num < 10.0;
        setUiState(prev => ({ ...prev, needsJustification: needsJust, error: null }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setUiState(prev => ({ ...prev, error: null }));

    // 1. Validar que haya un score
    if (!formData.score || formData.score === '') {
      setUiState(prev => ({...prev, error: "Debe ingresar una nota"}));
      return;
    }

    // 2. Rango (Manual 2026: 5.0 a 10.0)
    if (!validateScore(formData.score)) {
      setUiState(prev => ({...prev, error: "La nota debe estar entre 5.0 y 10.0 (Manual 2026)"}));
      return;
    }

    // 3. Justificación (SOLO si la nota es menor a 10)
    const scoreValue = parseFloat(formData.score);
    if (scoreValue < 10.0) {
        if (!formData.justification || formData.justification.trim().length < 50) {
             setUiState(prev => ({...prev, error: `Para notas menores a 10, la justificación es obligatoria (mín. 50 caracteres). Actual: ${formData.justification.trim().length}`}));
             return;
        }
    }

    // Submit exitoso
    addScore({
        ...formData,
        score: scoreValue,
        judgeId: state.user?.id || 'unknown'
    });

    setUiState({ error: null, success: true, needsJustification: false });
    
    // Reset parcial para facilitar carga rápida
    setTimeout(() => {
        setUiState({ error: null, success: false, needsJustification: false });
        setFormData(prev => ({ 
          ...prev, 
          score: '', 
          justification: '',
          // Mantener noche, jurado, comparsa y rubro para carga rápida
        }));
    }, 2000);
  };

  // Calcular ranking por puntaje neto (Manual 2026)
  const ranking = COMPARSAS.map(c => ({
    ...c,
    total: parseFloat(getTotalScore(c.id)),
    sancion: getSancion(c.id),
    neto: parseFloat(getPuntajeNeto(c.id))
  })).sort((a, b) => b.neto - a.neto);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
      {/* Mini Dashboard de Contexto */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          Puntajes Actuales
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ranking.map((comparsa, index) => (
            <div key={comparsa.id} className={`p-4 rounded-xl border ${comparsa.bg} backdrop-blur-sm border-white/10`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-mono">#{index + 1}</span>
                <div className={`w-2 h-2 rounded-full ${comparsa.bg.replace('/10', '')}`}></div>
              </div>
              <p className={`text-sm font-medium ${comparsa.color} mb-1`}>{comparsa.name}</p>
              <p className={`text-3xl font-black ${comparsa.color}`}>{comparsa.neto}</p>
              {comparsa.sancion > 0 && (
                <p className="text-xs text-red-400 mt-1">-{comparsa.sancion} sanción</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Formulario de Carga */}
      <div className="glass-card p-8 rounded-2xl border-t-4 border-yellow-500">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500">
               <Save size={24} />
            </span>
            Planilla de Notas
        </h2>

        {uiState.success ? (
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-green-500/10 border border-green-500/50 p-8 rounded-xl text-center mb-6"
             >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400">Nota Guardada Correctamente</h3>
                <p className="text-green-300/60 mt-2">La planilla ha sido encriptada y enviada.</p>
             </motion.div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Layout de 2 columnas: Selectores | Nota */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Columna 1: Selectores */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-yellow-500 mb-4 uppercase tracking-wide">Datos de la Planilla</h4>
                
                {/* Noche y Jurado */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                      <label className="block text-xs text-slate-400 mb-2 uppercase">Noche</label>
                      <select 
                          name="noche" 
                          value={formData.noche}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:border-yellow-500 outline-none appearance-none text-sm"
                      >
                          <option value="noche1">Noche 1</option>
                          <option value="noche2">Noche 2</option>
                          <option value="noche3">Noche 3</option>
                      </select>
                  </div>
                  <div>
                      <label className="block text-xs text-slate-400 mb-2 uppercase">Jurado</label>
                      <select 
                          name="jurado" 
                          value={formData.jurado}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:border-yellow-500 outline-none appearance-none text-sm"
                      >
                          <option value="jurado1">Jurado 1</option>
                          <option value="jurado2">Jurado 2</option>
                          <option value="jurado3">Jurado 3</option>
                          <option value="jurado4">Jurado 4</option>
                      </select>
                  </div>
                </div>

                {/* Institución */}
                <div>
                    <label className="block text-xs text-slate-400 mb-2 uppercase">Institución</label>
                    <select 
                        name="comparsaId" 
                        value={formData.comparsaId}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                        {COMPARSAS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                {/* Rubro */}
                <div>
                    <label className="block text-xs text-slate-400 mb-2 uppercase">Rubro</label>
                    <select 
                        name="rubroId" 
                        value={formData.rubroId}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                        {RUBROS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>                    
                </div>

                {/* Guía Técnica del Rubro */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <Info size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-semibold text-blue-400 uppercase mb-1">Guía Técnica - Manual 2026</p>
                            <p className="text-xs text-blue-200/80 leading-relaxed">
                                {RUBROS.find(r => r.id === formData.rubroId)?.guiaTecnica}
                            </p>
                        </div>
                    </div>
                </div>
              </div>

              {/* Columna 2: Input de Nota */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-yellow-500 mb-4 uppercase tracking-wide">Calificación</h4>
                
                <div className="bg-slate-900/50 p-6 rounded-xl border-2 border-slate-700">
                    <label className="block text-sm font-semibold text-yellow-500 mb-3 uppercase tracking-wide">
                        Nota (5.0 - 10.0) • Manual 2026
                    </label>
                    <input 
                        type="number" 
                        step="0.1" 
                        min="5" 
                        max="10"
                        name="score"
                        value={formData.score}
                        onChange={handleChange}
                        placeholder="10.0"
                        className="w-full text-6xl font-bold bg-transparent border-b-4 border-slate-600 focus:border-yellow-500 text-center py-6 text-white placeholder-slate-700 outline-none transition-colors"
                    />
                    
                    <AnimatePresence>
                        {uiState.needsJustification && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }} 
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-6 overflow-hidden"
                            >
                                <label className="text-sm text-slate-300 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={14} className="text-yellow-500" />
                                    Justificación Requerida
                                </label>
                                <textarea 
                                    name="justification"
                                    value={formData.justification}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white focus:border-yellow-500 outline-none transition-all resize-none"
                                    placeholder={`Describa el motivo del descuento técnico...\n(Mínimo 50 caracteres - Actual: ${formData.justification.length})`}
                                ></textarea>
                                <div className="text-right mt-1">
                                    <span className={`text-xs ${formData.justification.length < 50 ? 'text-red-400' : 'text-green-400'}`}>
                                        {formData.justification.length} / 50
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              </div>
            </div>
            
            {uiState.error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {uiState.error}
                </div>
            )}

            <button type="submit" className="w-full btn-primary py-4 text-lg">
                Confirmar Nota
            </button>
        </form>
        )}
      </div>

      {/* Panel de Ética y Obligaciones - Manual 2026 */}
      <div className="mt-8">
        <EthicsPanel />
      </div>
    </div>
  );
};

export default JudgeConsole;
