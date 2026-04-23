import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { MapPin, Clock, Users, Calendar, Activity, Bike, Mountain, Map, Compass, ChevronRight, Loader2 } from 'lucide-react';

export default function DashboardHome() {
  const [rutas, setRutas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const { data, error } = await supabase
          .from('rutas')
          .select(`
            *,
            organizador:perfiles!creador_id (
              nombre_completo
            )
          `)
          .order('fecha_hora_salida', { ascending: true });

        if (error) throw error;
        setRutas(data || []);
      } catch (error) {
        console.error("Error cargando rutas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const formatearFecha = (fechaIso: string) => {
    const fecha = new Date(fechaIso);
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return fecha.toLocaleDateString('es-ES', opciones).replace(',', ' -');
  };

  const getEstilosDificultad = (dificultad: string) => {
    switch (dificultad) {
      case 'Baja': return { borde: 'bg-green-500', texto: 'text-green-700', fondo: 'bg-green-50', etiqueta: 'bg-green-500' };
      case 'Media': return { borde: 'bg-orange-500', texto: 'text-orange-700', fondo: 'bg-orange-50', etiqueta: 'bg-orange-500' };
      case 'Alta': return { borde: 'bg-red-500', texto: 'text-red-700', fondo: 'bg-red-50', etiqueta: 'bg-red-500' };
      case 'A la aventura': return { borde: 'bg-purple-600', texto: 'text-purple-700', fondo: 'bg-purple-50', etiqueta: 'bg-purple-600' };
      default: return { borde: 'bg-gray-500', texto: 'text-gray-700', fondo: 'bg-gray-50', etiqueta: 'bg-gray-500' };
    }
  };

  const getIconoBici = (tipo: string, colorClass: string) => {
    switch (tipo) {
      case 'mountain bike': return <Mountain size={28} className={colorClass} />;
      case 'Carretera': return <Bike size={28} className={colorClass} />;
      case 'Gravel': return <Map size={28} className={colorClass} />;
      case 'Urbana': return <Compass size={28} className={colorClass} />;
      default: return <Bike size={28} className={colorClass} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Explorar Rutas</h2>
        <p className="text-verde-dehesa font-bold text-lg opacity-80">Descubre las próximas salidas de la comunidad extremeña.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-verde-dehesa" size={48} />
        </div>
      ) : rutas.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-dashed border-gray-300 text-center">
          <Compass size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-gray-700 mb-2">No hay rutas disponibles</h3>
          <p className="text-gray-500 font-bold">Sé el primero en organizar una salida para la comunidad.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rutas.map((ruta) => {
            const estilos = getEstilosDificultad(ruta.dificultad);
            const nombreOrganizador = ruta.organizador?.nombre_completo || 'Ciclista Anónimo';

            return (
              <div key={ruta.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${estilos.borde}`}></div>
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl ${estilos.fondo} shadow-inner`}>
                      {getIconoBici(ruta.tipo_bici, estilos.texto)}
                    </div>
                    <span className="text-xs font-black text-gray-500 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl flex items-center gap-2">
                      <Calendar size={14} /> {formatearFecha(ruta.fecha_hora_salida)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest text-white px-2 py-1 rounded-md ${estilos.etiqueta}`}>
                      {ruta.dificultad}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      {ruta.tipo_bici}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-verde-dehesa transition-colors line-clamp-2">
                    {ruta.titulo}
                  </h3>
                  
                  <div className="space-y-4 text-gray-500 text-sm mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-gray-400" />
                      {/* HEMOS VUELTO AL TEXTO GENÉRICO PARA EL TFG */}
                      <span className="font-bold">Ubicación por definir en mapa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity size={18} className="text-gray-400" />
                      <span className="font-bold">{ruta.distancia_estimada_km} km de recorrido</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-gray-400" />
                      <span className="font-bold">1 / {ruta.limite_participantes} Plazas ocupadas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
                    <div className="w-8 h-8 rounded-full bg-verde-dehesa text-white flex items-center justify-center font-bold text-xs">
                      {nombreOrganizador.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Organizado por</p>
                      <p className="font-bold text-gray-800 text-sm">{nombreOrganizador}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <button className="w-full flex items-center justify-center gap-2 bg-verde-dehesa text-white px-4 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest">
                    Ver Detalles de Ruta <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}