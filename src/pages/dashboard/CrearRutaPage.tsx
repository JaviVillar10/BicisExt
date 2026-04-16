import { MapPin, Calendar, Clock, Info, Bike, Gauge, Users, AlignLeft, Save } from 'lucide-react';

export default function CrearRutaPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Crear Nueva Ruta</h2>
        <p className="text-verde-dehesa font-bold text-lg opacity-80">Organiza una salida y comparte el camino con otros ciclistas.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
          
          <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
            <Info size={20} />
            <h3 className="font-black uppercase tracking-wider text-sm">Información de la Ruta</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Título de la Ruta</label>
              <input 
                type="text" 
                placeholder="Ej: Subida al Castillo de Montánchez" 
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-verde-dehesa outline-none transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Descripción / Detalles</label>
              <textarea 
                rows={3} 
                placeholder="Describe el itinerario, puntos de interés, paradas..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-verde-dehesa outline-none transition-all font-medium resize-none"
              ></textarea>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
            
            <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
              <MapPin size={20} />
              <h3 className="font-black uppercase tracking-wider text-sm">Punto de Encuentro</h3>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Lugar exacto de salida" 
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-verde-dehesa outline-none transition-all font-medium"
              />
              <div className="p-4 bg-emerald-50 rounded-2xl border border-verde-dehesa/10 text-xs text-emerald-800 font-bold flex items-center gap-3">
                <Info size={16} />
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
              <input 
                type="datetime-local" 
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-verde-dehesa outline-none transition-all font-medium"
              />
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
          
          <div className="flex items-center gap-2 mb-6 text-verde-dehesa">
            <Gauge size={20} />
            <h3 className="font-black uppercase tracking-wider text-sm">Especificaciones Técnicas</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Tipo de Bici</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 outline-none">
                <option>MTB</option>
                <option>Carretera</option>
                <option>Gravel</option>
                <option>Urbana</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Dificultad</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 outline-none">
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
                <option>Solo Expertos</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Distancia (km)</label>
              <input type="number" placeholder="0" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Participantes</label>
              <input type="number" placeholder="10" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold outline-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button className="px-8 py-4 rounded-2xl font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-sm">
            Descartar
          </button>
          <button className="bg-verde-dehesa text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-verde-dehesa/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest text-sm">
            <Save size={18} /> Publicar Ruta
          </button>
        </div>
      </form>
    </div>
  );
}