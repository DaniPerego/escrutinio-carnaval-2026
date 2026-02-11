import React, { useState } from 'react';
import { useScoring } from '../context/ScoringContext';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/data';
import { Lock, User } from 'lucide-react';

const Login = () => {
    const { login } = useScoring();
    const navigate = useNavigate();
    const [role, setRole] = useState(ROLES.JURADO);
    const [name, setName] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulación simple para prototipo
        if(!name) return;
        
        login({ id: Date.now(), name, role });
        
        if (role === ROLES.JURADO) navigate('/carga');
        else navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="glass-card w-full max-w-md p-8 rounded-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                         <label className="text-sm font-medium text-slate-300 block mb-1">Identificación</label>
                         <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input 
                                type="text"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-yellow-500 outline-none"
                                placeholder="Nombre completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-300 block mb-1">Clave de Acceso</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-yellow-500 outline-none"
                                placeholder="•••••••••"
                                defaultValue="123456"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary mt-4">
                        Ingresar
                    </button>
                    
                    <p className="text-xs text-center text-slate-600 mt-4">
                        Conexión segura SSL/TLS. Su IP está siendo registrada.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
