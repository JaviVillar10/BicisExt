// Ruta: src/components/common/Header.tsx
import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo de la web */}
        <Link to="/" className="flex items-center gap-2 text-gris-asfalto hover:text-black transition-colors">
          <Bike size={28} strokeWidth={2.5} className="text-verde-dehesa" />
          <span className="font-bold text-2xl tracking-tight">BicisExt</span>
        </Link>

        {/* Botones de Autenticación */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-gray-600 font-medium hover:text-verde-dehesa transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link 
            to="/registro" 
            className="bg-verde-dehesa text-white px-5 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all shadow-sm"
          >
            Registrarse
          </Link>
        </div>

      </div>
    </header>
  );
}