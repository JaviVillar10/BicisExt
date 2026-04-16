// Ruta: src/components/forms/SignUpForm.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, CreditCard, MapPin, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    dni: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    setError(null);

    // 1. Campos obligatorios
    if (Object.values(formData).some(val => val === '')) {
      setError('Todos los campos son obligatorios.');
      return false;
    }

    // 2. Validación Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El formato del correo electrónico no es válido.');
      return false;
    }

    // 3. Validación DNI (Estricta: 8 números y 1 letra)
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!dniRegex.test(formData.dni)) {
      setError('El DNI no tiene un formato válido (8 números y letra final).');
      return false;
    }

    // 4. Validación Teléfono (España: 9 dígitos, empieza por 6, 7, 8 o 9)
    const telRegex = /^[6789]\d{8}$/;
    if (!telRegex.test(formData.telefono)) {
      setError('El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9.');
      return false;
    }

    // 5. Validación Código Postal (5 dígitos)
    const cpRegex = /^\d{5}$/;
    if (!cpRegex.test(formData.codigo_postal)) {
      setError('El código postal debe tener exactamente 5 dígitos.');
      return false;
    }

    // 6. Contraseña (Mínimo 6 caracteres por seguridad de Supabase)
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    // 7. Coincidencia de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulación de envío a Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registro exitoso:', formData);
    } catch (err) {
      setError('Ocurrió un error durante el registro. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl my-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gris-asfalto mb-2">Crea tu cuenta</h2>
        <p className="text-gray-500">Únete a la comunidad ciclista de Extremadura</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-600">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre Completo */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="nombre_completo" type="text" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="Juan Pérez" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="email" type="email" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="juan@ejemplo.com" />
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="telefono" type="tel" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="600000000" />
          </div>
        </div>

        {/* DNI */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">DNI / NIE</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="dni" type="text" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="12345678X" />
          </div>
        </div>

        {/* Código Postal */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Código Postal</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="codigo_postal" type="text" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="06800" />
          </div>
        </div>

        {/* Ciudad */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Ciudad</label>
          <input name="ciudad" type="text" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="Mérida" />
        </div>

        {/* Provincia */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Provincia</label>
          <input name="provincia" type="text" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="Badajoz" />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="password" type="password" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="••••••" />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Repetir Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input name="confirmPassword" type="password" onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-dehesa outline-none text-black" placeholder="••••••" />
          </div>
        </div>

        {/* Botón */}
        <div className="md:col-span-2 mt-4">
          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 bg-verde-dehesa text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50">
            {isLoading ? <><Loader2 className="animate-spin mr-2" /> Creando cuenta...</> : 'Registrarse ahora'}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-gray-600">
        ¿Ya tienes cuenta? <Link to="/login" className="text-verde-dehesa font-bold hover:underline">Inicia sesión</Link>
      </p>
    </div>
  );
}