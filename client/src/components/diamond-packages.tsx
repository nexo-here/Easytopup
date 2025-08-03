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
    id: "1240-diamond",
    name: "১২৪০ Diamond",
    diamonds: 1240,
    price: 350,
    originalPrice: 400,
    badge: "জনপ্রিয়",
    badgeColor: "bg-red-500"
  },
  {
    id: "2560-diamond", 
    name: "২৫৬০ Diamond",
    diamonds: 2560,
    price: 610,
    originalPrice: 750,
    badge: "সেরা মূল্য",
    badgeColor: "bg-green-500"
  },
  {
    id: "weekly-monthly",
    name: "সাপ্তাহিক + মাসিক",
    diamonds: 0,
    price: 600,
    badge: "কম্বো",
    badgeColor: "bg-purple-500"
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
    <section id="topup" className="py-12 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">বিশেষ ছাড়ের অফার</h3>
          <p className="text-slate-400">সবচেয়ে ভালো দামে ডায়মন্ড কিনুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`bg-gradient-to-br from-slate-800 to-slate-900 border transition-all duration-300 transform hover:scale-105 ${
                selectedPackage?.id === pkg.id 
                  ? 'border-yellow-400 ring-2 ring-yellow-400/20' 
                  : 'border-slate-700 hover:border-yellow-400'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {pkg.diamonds > 0 ? (
                      <>
                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xl font-bold text-white">{pkg.diamonds}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg font-bold text-white">{pkg.name}</span>
                      </>
                    )}
                  </div>
                  {pkg.badge && (
                    <div className={`${pkg.badgeColor} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                      {pkg.badge}
                    </div>
                  )}
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">৳{pkg.price}</div>
                  {pkg.originalPrice && (
                    <div className="text-slate-400 line-through text-sm">৳{pkg.originalPrice}</div>
                  )}
                  {!pkg.diamonds && (
                    <div className="text-slate-400 text-sm">দুইটি পাস একসাথে</div>
                  )}
                </div>
                <Button 
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 font-medium transition-colors ${
                    selectedPackage?.id === pkg.id
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {selectedPackage?.id === pkg.id ? 'নির্বাচিত' : 'নির্বাচন করুন'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
