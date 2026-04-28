import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  ArrowLeft, Calendar, Clock, Activity, Users, Send, 
  MapPin, ShieldCheck, UserPlus, MessageCircle, Loader2, 
  Map as MapIcon, Flag, ChevronRight 
} from 'lucide-react';

import { MapContainer, TileLayer, Polyline, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const crearIconoPunto = (texto: string, color: string) => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        background-color: ${color};
        min-width: 32px;
        height: 32px;
        padding: 0 10px;
        border-radius: 16px;
        border: 3px solid white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 900;
        font-size: 10px;
        text-transform: uppercase;
        white-space: nowrap;
      ">
        ${texto}
      </div>
    `,
    iconSize: undefined,
    iconAnchor: [16, 16],
  });
};

// Componente para auto-ajustar el mapa al trazado
function BoundsRecalculator({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
}

export default function RutaDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [ruta, setRuta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mensajeTexto, setMensajeTexto] = useState('');
  const [coordenadasRuta, setCoordenadasRuta] = useState<[number, number][]>([]);
  const [cargandoMapa, setCargandoMapa] = useState(false);

  useEffect(() => {
    const fetchRuta = async () => {
      try {
        const { data, error } = await supabase
          .from('rutas')
          .select(`*, organizador:perfiles!creador_id(nombre_completo)`)
          .eq('id', id)
          .single();

        if (error) throw error;
        setRuta(data);

        if (data?.archivo_gpx_url) {
          setCargandoMapa(true);
          try {
            const respuesta = await fetch(data.archivo_gpx_url);
            const textoGpx = await respuesta.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(textoGpx, "text/xml");
            
            let puntos = xmlDoc.getElementsByTagName("trkpt");
            if (puntos.length === 0) puntos = xmlDoc.getElementsByTagName("rtept");
            
            const coordenadas: [number, number][] = [];
            for (let i = 0; i < puntos.length; i++) {
              const lat = parseFloat(puntos[i].getAttribute("lat") || "0");
              const lon = parseFloat(puntos[i].getAttribute("lon") || "0");
              if (lat !== 0 && lon !== 0) coordenadas.push([lat, lon]);
            }
            setCoordenadasRuta(coordenadas);
          } catch (e) {
            console.error("Error GPX:", e);
          } finally {
            setCargandoMapa(false);
          }
        }
      } catch (error) {
        console.error("Error al cargar:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchRuta();
  }, [id]);

  const obtenerFechaFormateada = (fechaIso: string) => {
    const f = new Date(fechaIso);
    return f.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const obtenerHoraFormateada = (fechaIso: string) => {
    const f = new Date(fechaIso);
    return f.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' h';
  };

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
      <Loader2 className="animate-spin text-verde-dehesa" size={48} />
      <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">Cargando detalles...</p>
    </div>
  );

  if (!ruta) return <div className="text-center py-20"><h2 className="text-2xl font-black">Ruta no encontrada</h2></div>;

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-verde-dehesa font-black transition-all bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Volver al Explorador
        </button>
        <div className="flex gap-3">
          <span className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> {ruta.tipo_bici}
          </span>
          <span className="bg-verde-dehesa/10 text-verde-dehesa border border-verde-dehesa/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
            Nivel {ruta.dificultad}
          </span>
        </div>
      </div>

      {/* TÍTULO Y ORGANIZADOR */}
      <div className="mb-10">
        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-none">
          {ruta.titulo}
        </h1>
        <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-gray-100 w-fit shadow-sm">
          <div className="w-10 h-10 rounded-full bg-verde-dehesa flex items-center justify-center text-white font-black shadow-md shadow-verde-dehesa/20">
            {ruta.organizador?.nombre_completo?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Líder de Ruta</p>
            <p className="font-bold text-gray-900">{ruta.organizador?.nombre_completo}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLUMNA IZQUIERDA: MAPA Y INFO TÉCNICA */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* MAPA INTERACTIVO PROFESIONAL */}
          <div className="bg-white rounded-[3rem] p-3 shadow-xl border border-gray-100 relative overflow-hidden h-[500px]">
            {cargandoMapa ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader2 size={48} className="animate-spin text-verde-dehesa" />
                <p className="text-verde-dehesa font-black tracking-widest uppercase text-[10px]">Procesando Telemetría GPX...</p>
              </div>
            ) : coordenadasRuta.length > 0 ? (
              <MapContainer 
                center={coordenadasRuta[0]} 
                zoom={13} 
                style={{ height: '100%', width: '100%', borderRadius: '2.5rem' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap'
                />
                
                {/* LÍNEA AZUL NEÓN */}
                <Polyline positions={coordenadasRuta} color="#0066FF" weight={10} opacity={0.15} />
                <Polyline positions={coordenadasRuta} color="#00D4FF" weight={4} opacity={1} />
                
               {}
                {(() => {
                  const inicio = coordenadasRuta[0];
                  const fin = coordenadasRuta[coordenadasRuta.length - 1];
                  const esCircular = Math.abs(inicio[0] - fin[0]) < 0.0002 && 
                                    Math.abs(inicio[1] - fin[1]) < 0.0002;

                  if (esCircular) {
                    return (
                      <Marker position={inicio} icon={crearIconoPunto("INICIO / META", "#4F46E5")}>
                        <Popup><span className="font-bold">Ruta Circular</span></Popup>
                      </Marker>
                    );
                  } else {
                    return (
                      <>
                        <Marker position={inicio} icon={crearIconoPunto("Inicio", "#00D4FF")} zIndexOffset={1000}>
                          <Popup><span className="font-bold">Punto de Salida</span></Popup>
                        </Marker>
                        <Marker position={fin} icon={crearIconoPunto("Meta", "#FF3B30")}>
                          <Popup><span className="font-bold">Punto de Llegada</span></Popup>
                        </Marker>
                      </>
                    );
                  }
                })()}
                
                <BoundsRecalculator positions={coordenadasRuta} />
              </MapContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-300">
                <MapIcon size={80} className="mb-4 opacity-20" />
                <p className="font-black uppercase tracking-widest text-xs">Sin trazado GPS disponible</p>
              </div>
            )}
          </div>

          {/* TARJETAS DE DATOS RÁPIDOS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center group hover:border-verde-dehesa transition-colors">
              <Calendar className="text-verde-dehesa mb-3 group-hover:scale-110 transition-transform" size={28} />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Fecha</p>
              <p className="font-black text-gray-900">{obtenerFechaFormateada(ruta.fecha_hora_salida)}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center group hover:border-verde-dehesa transition-colors">
              <Clock className="text-verde-dehesa mb-3 group-hover:scale-110 transition-transform" size={28} />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Hora Salida</p>
              <p className="font-black text-gray-900">{obtenerHoraFormateada(ruta.fecha_hora_salida)}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center group hover:border-verde-dehesa transition-colors">
              <Activity className="text-verde-dehesa mb-3 group-hover:scale-110 transition-transform" size={28} />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Distancia</p>
              <p className="font-black text-gray-900">{ruta.distancia_estimada_km} KM</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center group hover:border-verde-dehesa transition-colors">
              <Users className="text-verde-dehesa mb-3 group-hover:scale-110 transition-transform" size={28} />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Participantes</p>
              <p className="font-black text-gray-900">1 / {ruta.limite_participantes}</p>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative">
            <div className="absolute top-10 left-0 w-1.5 h-10 bg-verde-dehesa rounded-r-full"></div>
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Flag className="text-verde-dehesa" size={24} /> Resumen de la Actividad
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed text-lg italic">
              "{ruta.descripcion}"
            </p>
          </div>

          {/* LISTA DE PARTICIPANTES */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Pelotón Confirmado</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ciclistas en esta salida</p>
              </div>
              <span className="bg-gray-100 px-4 py-2 rounded-2xl font-black text-gray-600 text-sm">
                {ruta.limite_participantes - 1} plazas libres
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Participante (Organizador) */}
              <div className="flex items-center gap-4 p-4 bg-verde-dehesa/5 rounded-3xl border border-verde-dehesa/10">
                <div className="w-12 h-12 rounded-full bg-verde-dehesa text-white flex items-center justify-center font-black shadow-lg">
                  {ruta.organizador?.nombre_completo?.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-gray-900">{ruta.organizador?.nombre_completo}</p>
                  <p className="text-[10px] font-black text-verde-dehesa uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={12} /> Organizador
                  </p>
                </div>
              </div>

              {/* Espacio para futuros participantes */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200 opacity-60">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <UserPlus size={20} />
                </div>
                <p className="font-bold text-gray-400 text-sm">Esperando ciclistas...</p>
              </div>
            </div>
          </div>
        </div>

        {/* CHAT Y ACCIÓN PRINCIPAL */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* BOTÓN DE UNIRSE*/}
          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-gray-100">
            <button className="w-full bg-verde-dehesa hover:bg-emerald-700 text-white py-6 rounded-[2rem] font-black text-xl shadow-xl shadow-verde-dehesa/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest group">
              Unirse a la Ruta 
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
              Al unirte, aceptas las normas de la comunidad
            </p>
          </div>

          {/* CHAT DE LA RUTA */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col h-[550px] sticky top-6 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <div className="relative">
                <MessageCircle className="text-verde-dehesa" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-verde-dehesa border-2 border-gray-50 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest leading-none mb-1">Chat Grupal</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Solo participantes</p>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="bg-gray-50 p-5 rounded-3xl rounded-tl-none border border-gray-100">
                <p className="text-[10px] font-black text-verde-dehesa mb-2 uppercase tracking-widest">Aviso del Sistema</p>
                <p className="text-gray-500 text-xs font-medium leading-relaxed italic">
                  Este chat se activará automáticamente para coordinar el punto de encuentro cuando te unas a la ruta.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Escribir mensaje..." 
                  disabled 
                  className="flex-1 bg-transparent border-none text-xs text-gray-400 outline-none cursor-not-allowed px-2" 
                />
                <button className="bg-gray-200 p-3 rounded-xl">
                  <Send size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}