// Ruta: src/components/common/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-500 py-8 text-center mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="font-bold text-gris-asfalto">BicisExt</span>. 
        Proyecto TFG de DAW - Javier Villar Jiménez.
      </p>
    </footer>
  );
}