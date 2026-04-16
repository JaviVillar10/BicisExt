// Ruta: src/components/forms/LoginForm.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    setError(null);
    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login:', { email });
    } catch (err) {
      setError('Error al conectar. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gris-asfalto mb-2">Bienvenido</h2>
        <p className="text-gray-500 italic">"Pedaleando por nuestra tierra"</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-600">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-dehesa focus:border-transparent outline-none transition-all text-gray-800"
              placeholder="ejemplo@extremadura.es"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Contraseña</label>
            <Link to="#" className="text-sm text-verde-dehesa font-medium hover:underline">¿La has olvidado?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-dehesa focus:border-transparent outline-none transition-all text-gray-800"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3.5 px-4 bg-verde-dehesa text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-verde-dehesa/30 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Acceder'}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-500">
        ¿Aún no tienes cuenta?{' '}
        <Link to="/registro" className="text-verde-dehesa font-bold hover:underline">
          Regístrate gratis
        </Link>
      </div>
    </div>
  );
}