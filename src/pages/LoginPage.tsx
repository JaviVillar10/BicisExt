// Ruta: src/pages/LoginPage.tsx
import Header from '../components/common/Header';
import LoginForm from '../components/forms/LoginForm';
import Footer from '../components/common/Footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      
      <main className="flex-grow flex items-center justify-center p-4 bg-verde-dehesa relative overflow-hidden">
        
       
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full flex justify-center">
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}