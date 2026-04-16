import { MapPin, Clock, Calendar, Users, Settings, Trash2, ChevronRight, Bike, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MisRutasPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Mis Rutas</h2>
        <p className="text-verde-dehesa font-bold text-lg opacity-80">Gestiona las salidas que organizas y a las que asistes.</p>
      </div>

      
      <div className="flex gap-4 mb-8 border-b border-verde-dehesa/10 pb-4 overflow-x-auto">
        <button className="px-6 py-2 bg-verde-dehesa text-white rounded-xl font-bold whitespace-nowrap shadow-md shadow-verde-dehesa/20 transition-all">
          Próximas (2)
        </button>
        <button className="px-6 py-2 bg-white text-gray-500 border border-gray-100 rounded-xl font-bold hover:bg-verde-dehesa/5 hover:text-verde-dehesa whitespace-nowrap transition-all">
          Historial Pasado
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-verde-dehesa/20 flex flex-col justify-between relative overflow-hidden">
         
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-verde-dehesa"></div>
          
          <div>
            <div className="flex justify-between items-start mb-6 mt-2">
              <div className="flex items-center gap-2 bg-verde-dehesa/10 text-verde-dehesa px-4 py-1.5 rounded-xl">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Organizador</span>
              </div>
              <span className="text-xs font-black text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <Calendar size={14} /> MAÑANA
              </span>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
              Subida al Castillo de Montánchez
            </h3>
            
            <div className="space-y-3 text-gray-500 text-sm mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-verde-dehesa" />
                <span className="font-bold">Plaza de Montánchez</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-verde-dehesa" />
                <span className="font-bold">10:00h · Aprox 2h</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={18} className="text-verde-dehesa" />
                <span className="font-bold">8 / 15 Participantes confirmados</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-xl font-bold transition-all">
              <Settings size={18} /> Editar
            </button>
            <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 rounded-xl font-bold transition-all">
              <Trash2 size={18} /> Cancelar
            </button>
          </div>
        </div>

      
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative overflow-hidden">
         
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500"></div>
          
          <div>
            <div className="flex justify-between items-start mb-6 mt-2">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl">
                <CheckCircle2 size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Apuntado</span>
              </div>
              <span className="text-xs font-black text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <Calendar size={14} /> 12 NOV
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
                <span className="font-bold">08:30h · 45km</span>
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
  );
}