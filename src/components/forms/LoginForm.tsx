import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    setError(null);
    if (!email || !password) {
      setError('Debes rellenar todos los campos.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Introduce un email válido.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      
      navigate('/dashboard');
      
    } catch (err: any) {
      setError('Credenciales incorrectas o cuenta no confirmada.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hola de nuevo</h2>
        <p className="text-gray-600 font-medium">Inicia sesión en BicisExt</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-600">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-verde-dehesa outline-none transition-all"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-verde-dehesa outline-none transition-all"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 bg-verde-dehesa text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-md disabled:opacity-50"
        >
          {isLoading ? (
            <><Loader2 className="animate-spin mr-2" size={20} /> Entrando...</>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="text-verde-dehesa font-bold hover:underline">
            Crea una aquí
          </Link>
        </p>
      </div>
    </div>
  );
}