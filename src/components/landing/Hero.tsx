// Ruta: src/components/landing/Hero.tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-verde-dehesa text-white py-20 sm:py-32 overflow-hidden">
     
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Conecta, Organiza y <br className="hidden sm:block" />
          <span className="text-naranja-alerta">Pedalea por Extremadura</span>
        </h1>
        
        <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-gray-200 mb-10">
          La plataforma definitiva para ciclistas. Crea rutas, únete a grupos de tu nivel, establece puntos de encuentro seguros y comparte tu pasión sobre dos ruedas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/registro" 
            className="flex items-center justify-center gap-2 bg-naranja-alerta text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Únete a la Comunidad <ArrowRight size={20} />
          </Link>
          <Link 
            to="/login" 
            className="flex items-center justify-center gap-2 bg-white text-verde-dehesa px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}