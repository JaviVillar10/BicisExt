import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Bike, Home, PlusCircle, User, LogOut, Loader2, Map } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [perfil, setPerfil] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionAndFetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      const { data: perfilData, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error && perfilData) {
        setPerfil(perfilData);
      }
      setIsLoading(false);
    };

    checkSessionAndFetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-verde-dehesa/10 flex items-center justify-center">
        <Loader2 className="animate-spin text-verde-dehesa" size={48} />
      </div>
    );
  }

  const navLinks = [
    { name: 'Inicio', path: '/dashboard', icon: Home },
    { name: 'Crear Ruta', path: '/dashboard/crear', icon: PlusCircle },
    { name: 'Mis Rutas', path: '/dashboard/mis-rutas', icon: Map },
    { name: 'Mi Perfil', path: '/dashboard/perfil', icon: User },
  ];

  return (
    <div className="flex h-screen font-sans bg-white">
     
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex z-20">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Bike size={32} strokeWidth={2.5} className="text-verde-dehesa" />
            <span className="font-extrabold text-2xl tracking-tighter text-gray-800">BicisExt</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-verde-dehesa text-white shadow-lg shadow-verde-dehesa/20 scale-[1.02]' 
                    : 'text-gray-500 hover:bg-verde-dehesa/5 hover:text-verde-dehesa'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 mb-2">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col overflow-hidden bg-verde-dehesa/5">
        
       
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-verde-dehesa/10 flex items-center justify-between px-8 z-10 sticky top-0">
          <h1 className="text-2xl font-black text-verde-dehesa tracking-tight">
            {navLinks.find(link => link.path === location.pathname)?.name || 'Panel de Control'}
          </h1>

          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-verde-dehesa/10">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-tight">{perfil?.nombre_completo}</p>
              <p className="text-[10px] text-verde-dehesa font-black uppercase tracking-widest">{perfil?.rol || 'Ciclista'}</p>
            </div>
            {perfil?.avatar_url ? (
              <img src={perfil.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-verde-dehesa" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-verde-dehesa/10 flex items-center justify-center text-verde-dehesa font-bold border-2 border-verde-dehesa">
                {perfil?.nombre_completo?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

       
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}