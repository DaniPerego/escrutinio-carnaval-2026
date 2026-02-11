export const COMPARSAS = [
  { id: 'carumbe', name: 'Carumbé', color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'zumzum', name: 'Zum Zum', color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'tradicion', name: 'Tradición', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'lindaflor', name: 'Linda Flor', color: 'text-pink-500', bg: 'bg-pink-500/10' }
];

// RUBROS ACTUALIZADOS SEGÚN MANUAL DEL JURADO 2026
export const RUBROS = [
  { 
    id: 'alegorias', 
    name: 'Alegorías',
    guiaTecnica: 'NO restar por: merchandising, publicidad comercial en carros alegóricos, fallas de sonido ajenas a la comparsa.'
  },
  { 
    id: 'baianas', 
    name: 'Baianas',
    guiaTecnica: 'NO restar por: problemas de iluminación externa, fallas técnicas del sambódromo.'
  },
  { 
    id: 'bateria', 
    name: 'Batería',
    guiaTecnica: 'NO restar por: fallas de amplificación externa, problemas de micrófono del sambódromo.'
  },
  { 
    id: 'comision_frente', 
    name: 'Comisión de Frente',
    guiaTecnica: 'NO restar por: problemas climáticos, demoras ajenas a la comparsa.'
  },
  { 
    id: 'destaques', 
    name: 'Destaques',
    guiaTecnica: 'NO restar por: merchandising en vestuario, problemas de iluminación del sambódromo.'
  },
  { 
    id: 'enredo', 
    name: 'Enredo',
    guiaTecnica: 'NO restar por: interpretaciones artísticas válidas del tema histórico propuesto.'
  },
  { 
    id: 'armonia', 
    name: 'Armonía',
    guiaTecnica: 'NO restar por: diferencias en coreografía por sectores (si están coordinados internamente).'
  },
  { 
    id: 'mestre_porta_bandera', 
    name: 'Mestre y Portabandera',
    guiaTecnica: 'NO restar por: caída de elementos decorativos si no afecta la performance, problemas de iluminación.'
  },
  { 
    id: 'samba_enredo', 
    name: 'Samba de Enredo',
    guiaTecnica: 'NO restar por: fallas de sonido ajenas a la comparsa, problemas de amplificación externa. Verificar criterios de ejecución musical.'
  }
];

export const ROLES = {
  ADMIN: 'admin',
  JURADO: 'jurado',
  VEEDOR: 'veedor'
};

// OBLIGACIONES DEL JURADO SEGÚN MANUAL 2026
export const OBLIGACIONES_JURADO = [
  { id: 1, texto: 'Prohibición absoluta del uso de celulares durante el desfile', tipo: 'prohibicion' },
  { id: 2, texto: 'Mantener imparcialidad gestual (no aplaudir, gritar o mostrar parcialidad)', tipo: 'prohibicion' },
  { id: 3, texto: 'Entrega inmediata de planillas al finalizar cada desfile', tipo: 'obligacion' },
  { id: 4, texto: 'Justificación obligatoria para notas menores a 10.0 (mínimo 50 caracteres)', tipo: 'obligacion' },
  { id: 5, texto: 'Respetar el rango de calificación: 5.0 a 10.0 con precisión de 0.1', tipo: 'obligacion' },
  { id: 6, texto: 'No considerar factores externos ajenos a la comparsa (sonido, iluminación del sambódromo)', tipo: 'guia' }
];
