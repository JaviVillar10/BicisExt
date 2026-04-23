import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { MapPin, Clock, Calendar, Users, Trash2, ChevronRight, Bike, ShieldCheck, CheckCircle2, Loader2, PlusCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MisRutasPage() {
  const [rutasOrganizadas, setRutasOrganizadas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMisRutas = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
          .from('rutas')
          .select('*')
          .eq('creador_id', session.user.id)
          .order('fecha_hora_salida', { ascending: true });

        if (error) throw error;
        setRutasOrganizadas(data || []);
      } catch (error) {
        console.error("Error al cargar las rutas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMisRutas();
  }, []);

  const formatearFecha = (fechaIso: string) => {
    const fecha = new Date(fechaIso);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${dia}/${mes} - ${horas}:${minutos}h`;
  };

  
  const puedeCancelar = (fechaIso: string) => {
    const fechaRuta = new Date(fechaIso);
    const ahora = new Date();
    // Diferencia en milisegundos
    const diffMilisegundos = fechaRuta.getTime() - ahora.getTime();
    // Convertimos milisegundos a horas
    const horasRestantes = diffMilisegundos / (1000 * 60 * 60);
    
    return horasRestantes >= 1; // Devuelve true si falta 1 hora o más
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Mis Rutas</h2>
        <p className="text-verde-dehesa font-bold text-lg opacity-80">Gestiona las salidas que organizas y a las que asistes.</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-verde-dehesa/10 pb-4 overflow-x-auto">
        <button className="px-6 py-2 bg-verde-dehesa text-white rounded-xl font-bold whitespace-nowrap shadow-md shadow-verde-dehesa/20 transition-all">
          Próximas
        </button>
        <button className="px-6 py-2 bg-white text-gray-500 border border-gray-100 rounded-xl font-bold hover:bg-verde-dehesa/5 hover:text-verde-dehesa whitespace-nowrap transition-all">
          Historial Pasado
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUMNA 1: RUTAS QUE EL USUARIO ORGANIZA */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-800 border-b-2 border-verde-dehesa inline-block pb-1">Organizadas por mí</h3>
          
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-verde-dehesa" size={40} />
            </div>
          ) : rutasOrganizadas.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-dashed border-gray-300 text-center">
              <Bike size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold mb-4">Aún no has organizado ninguna ruta.</p>
              <Link to="/dashboard/crear" className="inline-flex items-center gap-2 text-verde-dehesa font-black hover:underline">
                <PlusCircle size={20} /> Crear mi primera ruta
              </Link>
            </div>
          ) : (
            rutasOrganizadas.map((ruta) => {
              const cancelable = puedeCancelar(ruta.fecha_hora_salida);

              return (
                <div key={ruta.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-verde-dehesa/20 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-verde-dehesa"></div>
                  
                  <div>
                    <div className="flex justify-between items-start mb-6 mt-2">
                      <div className="flex items-center gap-2 bg-verde-dehesa/10 text-verde-dehesa px-4 py-1.5 rounded-xl">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Organizador</span>
                      </div>
                      <span className="text-xs font-black text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
                        <Calendar size={14} /> {formatearFecha(ruta.fecha_hora_salida)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                      {ruta.titulo}
                    </h3>
                    
                    <div className="space-y-3 text-gray-500 text-sm mb-8">
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-verde-dehesa" />
                        <span className="font-bold">Ubicación (Próximamente)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-verde-dehesa" />
                        <span className="font-bold">{ruta.distancia_estimada_km} km · {ruta.dificultad}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-verde-dehesa" />
                        <span className="font-bold">0 / {ruta.limite_participantes} Participantes confirmados</span>
                      </div>
                    </div>
                  </div>

                  {/* ZONA DE ACCIONES MODIFICADA */}
                  <div className="pt-6 border-t border-gray-100">
                    {cancelable ? (
                      <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 rounded-xl font-bold transition-all">
                        <Trash2 size={18} /> Cancelar Ruta
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-400 px-4 py-3 rounded-xl font-bold cursor-not-allowed text-sm">
                        <AlertCircle size={18} />
                        No puedes cancelar a menos de 1h de la salida
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* COLUMNA 2: RUTAS A LAS QUE ESTÁ APUNTADO (Maqueta por ahora) */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-800 border-b-2 border-blue-500 inline-block pb-1">Apuntado</h3>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500"></div>
            
            <div>
              <div className="flex justify-between items-start mb-6 mt-2">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Apuntado</span>
                </div>
                <span className="text-xs font-black text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <Calendar size={14} /> 12/11 - 08:30h
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                Ruta Vía Verde de la Plata (Sur)
              </h3>
              
              <div className="space-y-3 text-gray-500 text-sm mb-8">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="font-bold">Teatro Romano, Mérida</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-400" />
                  <span className="font-bold">45 km · Media</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bike size={18} className="text-gray-400" />
                  <span className="font-bold">Organiza: Carlos Pérez</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
              <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-verde-dehesa/10 text-verde-dehesa hover:bg-verde-dehesa hover:text-white px-4 py-3 rounded-xl font-bold transition-all group">
                Ver Detalles <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center px-4 py-3 text-gray-400 hover:text-red-500 font-bold transition-colors text-sm underline underline-offset-2">
                Desapuntarme
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}