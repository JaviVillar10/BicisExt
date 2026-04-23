import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { MapPin, Calendar, Info, Gauge, Save, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function CrearRutaPage() {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_hora_salida: '',
    tipo_bici: 'mountain bike',
    dificultad: 'Baja',
    distancia_estimada_km: '',
    limite_participantes: '10' 
  });

  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Función para calcular la fecha y hora mínima
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

 
  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'titulo':
      case 'descripcion':
        if (!value.trim()) error = 'Este campo no puede estar vacío.';
        break;
      case 'fecha_hora_salida':
        if (!value) {
          error = 'Debes seleccionar una fecha y hora.';
        } else {
          const selectedDate = new Date(value);
          const minDate = new Date();
          minDate.setHours(minDate.getHours() + 2);

          if (selectedDate < minDate) {
            error = 'La ruta debe programarse con al menos 2 horas de antelación.';
          }
        }
        break;
      case 'distancia_estimada_km':
        if (!value || parseFloat(value) <= 0) error = 'La distancia debe ser mayor a 0 km.';
        break;
      case 'limite_participantes':
        const num = parseInt(value);
        if (!value || num <= 0) error = 'Debe haber al menos 1 participante.';
        else if (num > 12) error = 'El máximo de participantes permitido es 12.';
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

    
    const requiredFilled = formData.titulo && formData.descripcion && formData.fecha_hora_salida && formData.distancia_estimada_km && formData.limite_participantes;
    setIsValid(Object.keys(newErrors).length === 0 && Boolean(requiredFilled));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setNotification(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No hay sesión iniciada');

      const { error } = await supabase.from('rutas').insert([{
        creador_id: session.user.id, // OBLIGATORIO por tu RLS
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha_hora_salida: new Date(formData.fecha_hora_salida).toISOString(),
        tipo_bici: formData.tipo_bici,
        dificultad: formData.dificultad,
        distancia_estimada_km: parseFloat(formData.distancia_estimada_km),
        limite_participantes: parseInt(formData.limite_participantes),
        estado: 'pendiente'
      }]);

      if (error) throw error;
      setNotification({ type: 'success', text: '¡Ruta creada con éxito! Redirigiendo...' });
      setTimeout(() => {
        navigate('/dashboard/mis-rutas');
      }, 2000);
      
    } catch (err: any) {
      console.error("Error al crear la ruta:", err);
      setNotification({ type: 'error', text: 'Hubo un problema al crear la ruta. Inténtalo de nuevo.' });
      setIsLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

 
  const ErrorMessage = ({ name }: { name: string }) => (
    touched[name] && errors[name] ? (
      <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1 animate-fade-in-down">
        <AlertCircle size={12} /> {errors[name]}
      </p>
    ) : null
  );

  return (
    <div className="max-w-4xl mx-auto pb-10 relative">
      
      {/* MENSAJE FLOTANTE DE NOTIFICACIÓN */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in-down transition-all ${
          notification.type === 'success' ? 'bg-verde-dehesa text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-lg">{notification.text}</span>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Crear Nueva Ruta</h2>
        <p className="text-verde-dehesa font-bold text-lg opacity-80">Organiza una salida y comparte el camino con otros ciclistas.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* SECCIÓN 1: Información Básica */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
          
          <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
            <Info size={20} />
            <h3 className="font-black uppercase tracking-wider text-sm">Información de la Ruta</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Título de la Ruta</label>
              <input name="titulo" type="text" value={formData.titulo} onChange={handleChange} onBlur={() => handleBlur('titulo')} placeholder="Ej: Subida al Castillo de Montánchez" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 outline-none transition-all font-medium ${touched.titulo && errors.titulo ? 'border-red-400 focus:ring-red-400' : 'border-gray-100 focus:ring-verde-dehesa'}`} />
              <ErrorMessage name="titulo" />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Descripción / Detalles</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} onBlur={() => handleBlur('descripcion')} rows={3} placeholder="Describe el itinerario, puntos de interés, paradas..." className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 outline-none transition-all font-medium resize-none ${touched.descripcion && errors.descripcion ? 'border-red-400 focus:ring-red-400' : 'border-gray-100 focus:ring-verde-dehesa'}`}></textarea>
              <ErrorMessage name="descripcion" />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Logística y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
            <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
              <MapPin size={20} />
              <h3 className="font-black uppercase tracking-wider text-sm">Punto de Encuentro</h3>
            </div>
            <div className="space-y-4">
              <input type="text" disabled placeholder="Próximamente mapa interactivo" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-100 cursor-not-allowed outline-none font-medium" />
              <div className="p-4 bg-emerald-50 rounded-2xl border border-verde-dehesa/10 text-xs text-emerald-800 font-bold flex items-center gap-3">
                <Info size={16} className="shrink-0" />
                <span>Próximamente: Podrás seleccionar la ubicación exacta en el mapa de Extremadura.</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
            <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
              <Calendar size={20} />
              <h3 className="font-black uppercase tracking-wider text-sm">Fecha y Hora</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input name="fecha_hora_salida" type="datetime-local" min={getMinDateTime()} value={formData.fecha_hora_salida} onChange={handleChange} onBlur={() => handleBlur('fecha_hora_salida')} className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 outline-none transition-all font-medium ${touched.fecha_hora_salida && errors.fecha_hora_salida ? 'border-red-400 focus:ring-red-400' : 'border-gray-100 focus:ring-verde-dehesa'}`} />
                <ErrorMessage name="fecha_hora_salida" />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: Detalles Técnicos */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
          <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
            <Gauge size={20} />
            <h3 className="font-black uppercase tracking-wider text-sm">Especificaciones Técnicas</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Tipo de Bici</label>
              <select name="tipo_bici" value={formData.tipo_bici} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 outline-none">
                <option value="mountain bike">Mountain bike</option>
                <option value="Carretera">Carretera</option>
                <option value="Gravel">Gravel</option>
                <option value="Urbana">Urbana</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Dificultad</label>
              <select name="dificultad" value={formData.dificultad} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 outline-none">
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="A la aventura">A la aventura</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Distancia (km)</label>
              <input name="distancia_estimada_km" type="number" value={formData.distancia_estimada_km} onChange={handleChange} onBlur={() => handleBlur('distancia_estimada_km')} placeholder="Ej: 45" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 font-bold outline-none ${touched.distancia_estimada_km && errors.distancia_estimada_km ? 'border-red-400' : 'border-gray-100'}`} />
              <ErrorMessage name="distancia_estimada_km" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Participantes</label>
              <input name="limite_participantes" type="number" value={formData.limite_participantes} onChange={handleChange} onBlur={() => handleBlur('limite_participantes')} placeholder="Máx: 12" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 font-bold outline-none ${touched.limite_participantes && errors.limite_participantes ? 'border-red-400' : 'border-gray-100'}`} />
              <ErrorMessage name="limite_participantes" />
            </div>
          </div>
        </div>

        {}
        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate('/dashboard')} className="px-8 py-4 rounded-2xl font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-sm">
            Cancelar
          </button>
          <button type="submit" disabled={!isValid || isLoading} className={`px-10 py-4 rounded-2xl font-black shadow-lg transition-all flex items-center gap-2 uppercase tracking-widest text-sm ${isValid && !isLoading ? 'bg-verde-dehesa text-white shadow-verde-dehesa/30 hover:scale-[1.02] active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
            {isLoading ? 'Publicando...' : 'Publicar Ruta'}
          </button>
        </div>
      </form>
    </div>
  );
}