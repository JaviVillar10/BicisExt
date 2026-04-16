import { MapPin, Clock, Users, Calendar, ChevronRight, Activity, Bike } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Explorar Rutas</h2>
        <p className="text-[#009739] font-bold text-lg opacity-80">Próximas salidas por la comunidad extremeña</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#009739]/10 flex flex-col justify-between group relative overflow-hidden">
          
         
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#009739]"></div>
          
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#009739]/10 rounded-2xl text-[#009739]">
                <Bike size={24} />
              </div>
              <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 py-2 rounded-xl flex items-center gap-2">
                <Calendar size={14} /> 24 OCT
              </span>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#009739] transition-colors">
              Vía Verde de la Plata (Mérida)
            </h3>
            
            <div className="space-y-4 text-gray-500 text-sm mb-10">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#009739]" />
                <span className="font-bold">Teatro Romano, Mérida</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#009739]" />
                <span className="font-bold">09:00h · 45km</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-[#009739]" />
                <span className="font-bold text-[#009739] bg-[#009739]/5 px-2 py-0.5 rounded">Dificultad Media</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-gray-400" />
              <span className="text-sm font-black text-gray-800">4 / 12</span>
            </div>
            <button className="flex items-center gap-1 font-black text-[#009739] group-hover:gap-2 transition-all">
              VER RUTA <ChevronRight size={20} />
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#009739]/10 flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black"></div>
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-100 rounded-2xl text-gray-800">
                <Bike size={24} />
              </div>
              <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 py-2 rounded-xl flex items-center gap-2">
                <Calendar size={14} /> 28 OCT
              </span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#009739] transition-colors">
              Sierra de Montánchez
            </h3>
            <div className="space-y-4 text-gray-500 text-sm mb-10">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#009739]" />
                <span className="font-bold">Castillo de Montánchez</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#009739]" />
                <span className="font-bold">10:30h · 30km</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-red-500" />
                <span className="font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Dificultad Alta</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-gray-400" />
              <span className="text-sm font-black text-gray-800">8 / 10</span>
            </div>
            <button className="flex items-center gap-1 font-black text-[#009739] group-hover:gap-2 transition-all">
              VER RUTA <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}