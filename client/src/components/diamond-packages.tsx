import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DiamondPackageType } from "@shared/schema";

interface DiamondPackagesProps {
  onSelectPackage: (pkg: DiamondPackageType) => void;
  selectedPackage: DiamondPackageType | null;
}

const packages: DiamondPackageType[] = [
  {
    id: "100-diamond",
    name: "১০০ Diamond",
    diamonds: 100,
    price: 85,
    originalPrice: 100,
    badge: "স্টার্টার",
    badgeColor: "bg-blue-500"
  },
  {
    id: "310-diamond",
    name: "৩১০ Diamond",
    diamonds: 310,
    price: 250,
    originalPrice: 280,
    badge: "জনপ্রিয়",
    badgeColor: "bg-red-500"
  },
  {
    id: "520-diamond", 
    name: "৫২০ Diamond",
    diamonds: 520,
    price: 400,
    originalPrice: 450,
    badge: "সেরা মূল্য",
    badgeColor: "bg-green-500"
  },
  {
    id: "1060-diamond",
    name: "১০৬০ Diamond",
    diamonds: 1060,
    price: 800,
    originalPrice: 900,
    badge: "বেস্ট সেলার",
    badgeColor: "bg-yellow-500"
  },
  {
    id: "2180-diamond",
    name: "২১৮০ Diamond",
    diamonds: 2180,
    price: 1600,
    originalPrice: 1800,
    badge: "প্রিমিয়াম",
    badgeColor: "bg-purple-500"
  },
  {
    id: "5600-diamond",
    name: "৫৬০০ Diamond",
    diamonds: 5600,
    price: 4000,
    originalPrice: 4500,
    badge: "আল্টিমেট",
    badgeColor: "bg-gradient-to-r from-yellow-400 to-orange-500"
  }
];

export default function DiamondPackages({ onSelectPackage, selectedPackage }: DiamondPackagesProps) {
  const handleSelectPackage = (pkg: DiamondPackageType) => {
    onSelectPackage(pkg);
    
    // Scroll to player ID section
    setTimeout(() => {
      const playerSection = document.getElementById('player-section');
      if (playerSection) {
        playerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="topup" className="py-16 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Diamond Packages
          </h3>
          <p className="text-slate-300 text-lg">সবচেয়ে ভালো দামে ডায়মন্ড কিনুন - তাৎক্ষণিক ডেলিভারি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-black/80 border transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group ${
                selectedPackage?.id === pkg.id 
                  ? 'border-yellow-400 ring-2 ring-yellow-400/30 shadow-yellow-400/20 shadow-lg' 
                  : 'border-slate-700/50 hover:border-orange-400/50'
              }`}
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Popular Badge */}
              {pkg.badge && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className={`${pkg.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12`}>
                    {pkg.badge}
                  </div>
                </div>
              )}

              <CardContent className="relative p-6 space-y-4">
                {/* Diamond Count */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-2xl font-bold text-white">{pkg.diamonds}</span>
                  </div>
                  <div className="text-sm text-slate-400">Free Fire Diamonds</div>
                </div>

                {/* Pricing */}
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    ৳{pkg.price}
                  </div>
                  {pkg.originalPrice && (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-slate-400 line-through text-lg">৳{pkg.originalPrice}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Value Indicator */}
                <div className="text-center text-xs text-slate-400">
                  ৳{(pkg.price / pkg.diamonds).toFixed(2)} per Diamond
                </div>

                {/* Select Button */}
                <Button 
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-4 font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                    selectedPackage?.id === pkg.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
                >
                  {selectedPackage?.id === pkg.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>নির্বাচিত</span>
                    </div>
                  ) : (
                    'নির্বাচন করুন'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
