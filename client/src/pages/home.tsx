import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import DiamondPackages from "@/components/diamond-packages";
import PlayerInfo from "@/components/player-info";
import PaymentSection from "@/components/payment-section";
import UserDashboard from "@/components/user-dashboard";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import type { DiamondPackageType } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackageType | null>(null);
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleOrderComplete = () => {
    // Reset form after successful order
    setSelectedPackage(null);
    setPlayerId("");
    setPlayerName("");
    
    // Scroll to user dashboard if logged in
    if (user) {
      setTimeout(() => {
        const dashboard = document.querySelector('[data-section="user-dashboard"]');
        if (dashboard) {
          dashboard.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      
      <main>
        <div id="home">
          <HeroSection />
        </div>
        
        <DiamondPackages 
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
        />
        
        <PlayerInfo 
          selectedPackage={selectedPackage}
          playerId={playerId}
          setPlayerId={setPlayerId}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
        
        <PaymentSection 
          selectedPackage={selectedPackage}
          playerId={playerId}
          playerName={playerName}
          onOrderComplete={handleOrderComplete}
        />
        
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
