// Ruta: src/pages/SignUpPage.tsx
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SignUpForm from '../components/forms/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      {/* Main con el color Verde Dehesa de Extremadura */}
      <main className="flex-grow flex items-center justify-center bg-verde-dehesa p-6">
        <SignUpForm />
      </main>

      <Footer />
    </div>
  );
}