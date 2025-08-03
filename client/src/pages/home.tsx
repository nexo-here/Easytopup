import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import DiamondPackages from "@/components/diamond-packages";
import FreefireUidInput from "@/components/freefire-uid-input";
import FreefirePayment from "@/components/freefire-payment";
import UserDashboard from "@/components/user-dashboard";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import type { DiamondPackageType } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackageType | null>(null);
  const [uid, setUid] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handlePaymentSuccess = (transactionId: string, method: string) => {
    console.log(`Payment successful: ${transactionId} via ${method}`);
    
    // Reset form after successful payment
    setSelectedPackage(null);
    setUid("");
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
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 text-white">
      <Header />
      
      <main>
        <div id="home">
          <HeroSection />
        </div>
        
        <DiamondPackages 
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
        />
        
        <FreefireUidInput 
          uid={uid}
          setUid={setUid}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
        
        <FreefirePayment 
          selectedPackage={selectedPackage}
          uid={uid}
          playerName={playerName}
          onPaymentSuccess={handlePaymentSuccess}
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
