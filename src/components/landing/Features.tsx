import { MapPin, ShieldCheck, Star } from 'lucide-react';

const features = [
  {
    title: 'Rutas Geolocalizadas',
    description: 'Encuentra el punto exacto de salida en el mapa gracias a nuestra integración interactiva.',
    icon: MapPin,
  },
  {
    title: 'Grupos Seguros',
    description: 'Limitamos el aforo máximo de cada ruta para garantizar tu seguridad en carretera y montaña.',
    icon: ShieldCheck,
  },
  {
    title: 'Comunidad Activa',
    description: 'Valora las rutas y a los usuarios al terminar. Mantén un entorno sano y de respeto.',
    icon: Star,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Todo lo que necesitas para tu ruta</h2>
          <p className="mt-4 text-gray-400">Diseñado por y para ciclistas de la región.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gris-asfalto p-6 rounded-xl shadow-sm border border-gray-800 hover:border-verde-dehesa transition-colors">
              <div className="w-12 h-12 bg-verde-dehesa bg-opacity-20 rounded-lg flex items-center justify-center mb-4 text-green-400">
                <feature.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}