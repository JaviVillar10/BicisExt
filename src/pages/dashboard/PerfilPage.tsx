import { User, Mail, Phone, CreditCard, MapPin, Building, Map, Camera, Shield, Save, Key } from 'lucide-react';

export default function PerfilPage() {
  const user = {
    nombre: "Javier Villar Jiménez",
    email: "javier.villar@example.com",
    telefono: "600 123 456",
    dni: "12345678A",
    ciudad: "Mérida",
    provincia: "Badajoz",
    cp: "06800",
    rol: "Ciclista",
    avatar: null 
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Mi Perfil</h2>
        <p className="text-verde-dehesa font-bold text-lg opacity-80">Gestiona tu información personal y preferencias de cuenta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
       
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-verde-dehesa"></div>
            
            <div className="relative inline-block mb-4">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-verde-dehesa object-cover mx-auto" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-verde-dehesa/10 flex items-center justify-center text-verde-dehesa text-4xl font-black border-4 border-verde-dehesa mx-auto">
                  {user.nombre.charAt(0)}
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-verde-dehesa hover:scale-110 transition-transform">
                <Camera size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-black text-gray-900 leading-tight">{user.nombre}</h3>
            <p className="text-verde-dehesa font-black text-xs uppercase tracking-widest mt-1">{user.rol}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-around text-sm">
              <div>
                <p className="font-black text-gray-900">12</p>
                <p className="text-gray-400 font-bold text-[10px] uppercase">Rutas</p>
              </div>
              <div className="border-x border-gray-50 px-6">
                <p className="font-black text-gray-900">4.8</p>
                <p className="text-gray-400 font-bold text-[10px] uppercase">Nota</p>
              </div>
              <div>
                <p className="font-black text-gray-900">152</p>
                <p className="text-gray-400 font-bold text-[10px] uppercase">Km</p>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-600 font-bold py-4 rounded-2xl shadow-sm border border-gray-100 hover:text-red-600 hover:bg-red-50 transition-all">
            <Key size={18} /> Cambiar Contraseña
          </button>
        </div>

        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
            
            <div className="flex items-center gap-2 mb-8 text-verde-dehesa">
              <User size={20} />
              <h3 className="font-black uppercase tracking-wider text-sm">Información Personal</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="text" defaultValue={user.nombre} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 focus:bg-white focus:border-verde-dehesa outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="email" defaultValue={user.email} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 focus:bg-white focus:border-verde-dehesa outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="text" defaultValue={user.telefono} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 focus:bg-white focus:border-verde-dehesa outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">DNI</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="text" defaultValue={user.dni} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 focus:bg-white focus:border-verde-dehesa outline-none transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-verde-dehesa/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-verde-dehesa"></div>
            
            <div className="flex items-center gap-2 mb-8 text-verde-dehesa">
              <MapPin size={20} />
              <h3 className="font-black uppercase tracking-wider text-sm">Ubicación y Contacto</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Ciudad</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="text" defaultValue={user.ciudad} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Provincia</label>
                <div className="relative">
                  <Map className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="text" defaultValue={user.provincia} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">C.P.</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3 text-gray-300" size={18} />
                  <input type="text" defaultValue={user.cp} className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 font-bold text-gray-700 outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-verde-dehesa text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-verde-dehesa/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest text-sm">
              <Save size={18} /> Guardar Cambios
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}