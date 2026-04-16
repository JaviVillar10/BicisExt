import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, CreditCard, MapPin, Map, Lock, AlertCircle, Loader2, CheckCircle2, XCircle, Image as ImageIcon, Building } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SignUpForm() {
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    dni: '',
    codigo_postal: '',
    ciudad: '',
    provincia: '',
    avatar_url: '', // Opcional
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  
  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'nombre_completo':
        if (!value.trim()) error = 'El nombre no puede estar vacío.';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'El email es obligatorio.';
        else if (!emailRegex.test(value)) error = 'Formato de email inválido.';
        break;
      case 'telefono':
        const telRegex = /^[6789]\d{8}$/;
        if (!value) error = 'El teléfono es obligatorio.';
        else if (!telRegex.test(value)) error = 'Debe empezar por 6,7,8 o 9 y tener 9 dígitos.';
        break;
      case 'dni':
        const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        if (!value) error = 'El DNI es obligatorio.';
        else if (!dniRegex.test(value)) error = 'Formato inválido (8 números y letra).';
        break;
      case 'codigo_postal':
        const cpRegex = /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
        if (!value) error = 'El CP es obligatorio.';
        else if (!cpRegex.test(value)) error = 'Código postal español no válido.';
        break;
      case 'ciudad':
        if (!value.trim()) error = 'La ciudad es obligatoria.';
        break;
      case 'provincia':
        if (!value.trim()) error = 'La provincia es obligatoria.';
        break;
      case 'avatar_url':
        // Es opcional, pero si escriben algo, debe ser un enlace válido
        const urlRegex = /^https?:\/\/.+\..+/;
        if (value && !urlRegex.test(value)) error = 'Debe ser una URL válida (http/https).';
        break;
      case 'password':
        if (!value) error = 'La contraseña es obligatoria.';
        else if (value.length < 6) error = 'Mínimo 6 caracteres.';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Las contraseñas no coinciden.';
        break;
    }
    return error;
  };

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    
    const requiredFields = ['nombre_completo', 'email', 'telefono', 'dni', 'codigo_postal', 'ciudad', 'provincia', 'password', 'confirmPassword'];
    const allFilled = requiredFields.every(key => formData[key as keyof typeof formData] !== '');
    
    setIsValid(Object.keys(newErrors).length === 0 && allFilled);
  }, [formData]);

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'telefono' || name === 'codigo_postal') {
      finalValue = value.replace(/\D/g, ''); 
      if (name === 'telefono') finalValue = finalValue.slice(0, 9);
      if (name === 'codigo_postal') finalValue = finalValue.slice(0, 5); 
    }

    if (name === 'dni') {
      const onlyNums = value.replace(/\D/g, '').slice(0, 8);
      if (onlyNums.length === 8) {
        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        const letra = letras.charAt(parseInt(onlyNums) % 23);
        finalValue = onlyNums + letra;
      } else {
        finalValue = onlyNums;
      }
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    if (type === 'error') {
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return; 

    setIsLoading(true);
    setNotification(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Filtro Anti-Duplicados
      if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
        showNotification('error', 'Este correo electrónico ya está registrado.');
        setIsLoading(false);
        return; 
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('perfiles')
          .insert([{
            id: authData.user.id,
            email: formData.email, 
            nombre_completo: formData.nombre_completo,
            telefono: formData.telefono,
            dni: formData.dni,
            codigo_postal: formData.codigo_postal,
            ciudad: formData.ciudad, 
            provincia: formData.provincia, 
            avatar_url: formData.avatar_url || null, 
            rol: 'usuario' 
          }]);

        if (profileError) throw profileError;
        
        showNotification('success', '¡Usuario creado correctamente! Redirigiendo al inicio de sesión...');
        
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    } catch (err: any) {
      console.error("Error de Supabase:", err);
      let errorMessage = 'Ocurrió un error al registrarte.';
      if (err.message?.includes('already registered')) {
        errorMessage = 'Este correo electrónico ya está registrado.';
      }
      showNotification('error', errorMessage);
    } finally {
      if (!notification || notification.type === 'error') {
        setIsLoading(false);
      }
    }
  };

  const ErrorMsg = ({ name }: { name: string }) => (
    touched[name] && errors[name] ? (
      <span className="text-xs font-bold text-red-600 flex items-center gap-1 animate-bounce">
        <AlertCircle size={12} /> {errors[name]}
      </span>
    ) : null
  );

  return (
    
    <div className="relative w-full max-w-4xl bg-white p-8 sm:p-10 rounded-2xl shadow-2xl my-10 border-t-8 border-verde-dehesa">
      
      {notification && (
        <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 animate-fade-in-down transition-all z-50 ${
          notification.type === 'success' ? 'bg-verde-dehesa text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          <span className="font-bold text-center">{notification.text}</span>
        </div>
      )}

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Registro de Ciclista</h2>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Extremadura en Ruta</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Nombre Completo</label>
              <ErrorMsg name="nombre_completo" />
            </div>
            <div className="relative">
              <User className={`absolute left-3 top-2.5 ${touched.nombre_completo && errors.nombre_completo ? 'text-red-400' : 'text-gray-400'}`} size={18} />
              <input name="nombre_completo" type="text" value={formData.nombre_completo} onBlur={() => handleBlur('nombre_completo')} onChange={handleChange} disabled={isLoading} className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition-all ${touched.nombre_completo && errors.nombre_completo ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-verde-dehesa'}`} placeholder="Javier Villar Jiménez" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Email</label>
              <ErrorMsg name="email" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="email" type="email" value={formData.email} onBlur={() => handleBlur('email')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50" placeholder="tu@email.com" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Teléfono</label>
              <ErrorMsg name="telefono" />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="telefono" type="text" value={formData.telefono} onBlur={() => handleBlur('telefono')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50" placeholder="600123456" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">DNI (Auto-letra)</label>
              <ErrorMsg name="dni" />
            </div>
            <div className="relative">
              <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="dni" type="text" value={formData.dni} onBlur={() => handleBlur('dni')} onChange={handleChange} disabled={isLoading} maxLength={9} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50 font-mono" placeholder="12345678A" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">URL Imagen (Opcional)</label>
              <ErrorMsg name="avatar_url" />
            </div>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="imagen_url" type="text" value={formData.avatar_url} onBlur={() => handleBlur('imagen_url')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50" placeholder="https://mi-foto.com/perfil.jpg" />
            </div>
          </div>
        </div>

        
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="text-sm font-bold text-gray-700">Ciudad</label>
                <ErrorMsg name="ciudad" />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input name="ciudad" type="text" value={formData.ciudad} onBlur={() => handleBlur('ciudad')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50" placeholder="Mérida" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="text-sm font-bold text-gray-700">Provincia</label>
                <ErrorMsg name="provincia" />
              </div>
              <div className="relative">
                <Map className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input name="provincia" type="text" value={formData.provincia} onBlur={() => handleBlur('provincia')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50" placeholder="Badajoz" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Código Postal</label>
              <ErrorMsg name="codigo_postal" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="codigo_postal" type="text" value={formData.codigo_postal} onBlur={() => handleBlur('codigo_postal')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none text-black bg-gray-50" placeholder="06800" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Contraseña</label>
              <ErrorMsg name="password" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="password" type="password" value={formData.password} onBlur={() => handleBlur('password')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none bg-gray-50" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Repetir Contraseña</label>
              <ErrorMsg name="confirmPassword" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onBlur={() => handleBlur('confirmPassword')} onChange={handleChange} disabled={isLoading} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-verde-dehesa outline-none bg-gray-50" placeholder="••••••••" />
            </div>
          </div>

          
          <div className="mt-8">
            <button 
              type="submit" 
              disabled={!isValid || isLoading} 
              className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${isValid && !isLoading ? 'bg-verde-dehesa text-white hover:scale-[1.02] active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <><Loader2 className="animate-spin mr-2" /> Procesando...</>
              ) : (
                <>{isValid && <CheckCircle2 className="mr-2 text-white" size={20} />} Registrarme en BicisExt</>
              )}
            </button>
            {!isValid && !isLoading && (
              <p className="text-center text-[11px] text-gray-400 mt-2 uppercase tracking-tighter">
                Completa todos los campos para continuar
              </p>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}