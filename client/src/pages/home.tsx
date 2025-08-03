import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CategoryGrid from "@/components/category-grid";
import UserDashboard from "@/components/user-dashboard";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 text-white">
      <Header />
      
      <main>
        <div id="home">
          <HeroSection />
        </div>
        
        <CategoryGrid />
        
        {user && (
          <div data-section="user-dashboard">
            <UserDashboard />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
