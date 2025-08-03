import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FreefireUidInput from "@/components/freefire-uid-input";
import FreefirePayment from "@/components/freefire-payment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, Calendar, Trophy, Globe, Star, Gift, Zap } from "lucide-react";
import { useLocation } from "wouter";
import type { TopupPackageType } from "@shared/schema";

// Category package data
const categoryPackages: Record<string, TopupPackageType[]> = {
  "weekly-monthly": [
    {
      id: "combo-1",
      categoryId: "weekly-monthly",
      name: "১২৪০ Diamond কম্বো",
      nameEn: "1240 Diamond Combo",
      diamonds: 1240,
      price: 350,
      originalPrice: 788,
      badge: "কম্বো অফার",
      badgeColor: "bg-red-500",
      description: "স্পেশাল ডিসকাউন্ট অফার"
    },
    {
      id: "combo-2", 
      categoryId: "weekly-monthly",
      name: "২৫৬০ Diamond কম্বো",
      nameEn: "2560 Diamond Combo",
      diamonds: 2560,
      price: 610,
      originalPrice: 1560,
      badge: "কম্বো অফার",
      badgeColor: "bg-red-500",
      description: "মেগা ডিসকাউন্ট অফার"
    },
    {
      id: "combo-3",
      categoryId: "weekly-monthly", 
      name: "৫০৬০ Diamond কম্বো",
      nameEn: "5060 Diamond Combo",
      diamonds: 5060,
      price: 1250,
      originalPrice: 3120,
      badge: "কম্বো অফার",
      badgeColor: "bg-red-500",
      description: "আল্টিমেট ডিসকাউন্ট অফার"
    },
    {
      id: "combo-4",
      categoryId: "weekly-monthly",
      name: "Weekly+Monthly",
      nameEn: "Weekly + Monthly Subscription",
      price: 600,
      originalPrice: 915,
      badge: "সাবস্ক্রিপশন কম্বো",
      badgeColor: "bg-purple-500",
      description: "সাপ্তাহিক + মাসিক প্ল্যান একসাথে",
      validity: "৩০ দিনের জন্য বৈধ"
    }
  ],
  "uid-topup-bd": [
    {
      id: "bd-1",
      categoryId: "uid-topup-bd",
      name: "২৫ Diamond",
      nameEn: "25 Diamond",
      diamonds: 25,
      price: 23,
      badge: "স্টার্টার",
      badgeColor: "bg-blue-500",
      description: "নতুন খেলোয়াড়দের জন্য"
    },
    {
      id: "bd-2",
      categoryId: "uid-topup-bd",
      name: "৫০ Diamond",
      nameEn: "50 Diamond",
      diamonds: 50,
      price: 37,
      badge: "নতুন",
      badgeColor: "bg-green-500",
      description: "সাশ্রয়ী প্যাকেজ"
    },
    {
      id: "bd-3",
      categoryId: "uid-topup-bd",
      name: "১১৫ Diamond",
      nameEn: "115 Diamond",
      diamonds: 115,
      price: 78,
      description: "মাঝারি প্যাকেজ"
    },
    {
      id: "bd-4",
      categoryId: "uid-topup-bd",
      name: "২৪০ Diamond",
      nameEn: "240 Diamond",
      diamonds: 240,
      price: 158,
      description: "জনপ্রিয় প্যাকেজ"
    },
    {
      id: "bd-5",
      categoryId: "uid-topup-bd",
      name: "৩৫৫ Diamond",
      nameEn: "355 Diamond",
      diamonds: 355,
      price: 235,
      description: "স্ট্যান্ডার্ড প্যাকেজ"
    },
    {
      id: "bd-6",
      categoryId: "uid-topup-bd",
      name: "৪৮০ Diamond",
      nameEn: "480 Diamond",
      diamonds: 480,
      price: 313,
      description: "ভালো মূল্যের প্যাকেজ"
    },
    {
      id: "bd-7",
      categoryId: "uid-topup-bd",
      name: "৫০৫ Diamond",
      nameEn: "505 Diamond",
      diamonds: 505,
      price: 348,
      badge: "জনপ্রিয়",
      badgeColor: "bg-orange-500",
      description: "সবচেয়ে বিক্রিত প্যাকেজ"
    },
    {
      id: "bd-8",
      categoryId: "uid-topup-bd",
      name: "৬১০ Diamond",
      nameEn: "610 Diamond",
      diamonds: 610,
      price: 397,
      description: "উন্নত প্যাকেজ"
    },
    {
      id: "bd-9",
      categoryId: "uid-topup-bd",
      name: "৮৫০ Diamond",
      nameEn: "850 Diamond",
      diamonds: 850,
      price: 548,
      description: "প্রিমিয়াম প্যাকেজ"
    },
    {
      id: "bd-10",
      categoryId: "uid-topup-bd",
      name: "১০৯০ Diamond",
      nameEn: "1090 Diamond",
      diamonds: 1090,
      price: 730,
      badge: "বেস্ট সেলার",
      badgeColor: "bg-purple-500",
      description: "দক্ষ খেলোয়াড়দের জন্য"
    },
    {
      id: "bd-11",
      categoryId: "uid-topup-bd",
      name: "১২৪০ Diamond",
      nameEn: "1240 Diamond",
      diamonds: 1240,
      price: 788,
      description: "উচ্চ-মানের প্যাকেজ"
    },
    {
      id: "bd-12",
      categoryId: "uid-topup-bd",
      name: "১৮৫০ Diamond",
      nameEn: "1850 Diamond",
      diamonds: 1850,
      price: 1170,
      description: "বড় প্যাকেজ"
    },
    {
      id: "bd-13",
      categoryId: "uid-topup-bd",
      name: "২০৯০ Diamond",
      nameEn: "2090 Diamond",
      diamonds: 2090,
      price: 1330,
      description: "মেগা প্যাকেজ"
    },
    {
      id: "bd-14",
      categoryId: "uid-topup-bd",
      name: "২৫৩০ Diamond",
      nameEn: "2530 Diamond",
      diamonds: 2530,
      price: 1560,
      badge: "বেস্ট ভ্যালু",
      badgeColor: "bg-yellow-500",
      description: "সর্বোচ্চ সাশ্রয়"
    },
    {
      id: "bd-15",
      categoryId: "uid-topup-bd",
      name: "৩৭৭০ Diamond",
      nameEn: "3770 Diamond",
      diamonds: 3770,
      price: 2360,
      description: "সুপার প্যাকেজ"
    },
    {
      id: "bd-16",
      categoryId: "uid-topup-bd",
      name: "৪০১০ Diamond",
      nameEn: "4010 Diamond",
      diamonds: 4010,
      price: 2490,
      description: "আল্ট্রা প্যাকেজ"
    },
    {
      id: "bd-17",
      categoryId: "uid-topup-bd",
      name: "৫০৬০ Diamond",
      nameEn: "5060 Diamond",
      diamonds: 5060,
      price: 3120,
      badge: "প্রিমিয়াম",
      badgeColor: "bg-red-500",
      description: "পেশাদার খেলোয়াড়দের জন্য"
    }
  ],
  "level-up-pass": [
    {
      id: "lp-1",
      categoryId: "level-up-pass",
      name: "লেভেল আপ পাস",
      nameEn: "Level Up Pass",
      price: 150,
      badge: "নতুন",
      badgeColor: "bg-yellow-500",
      description: "দ্রুত লেভেল আপ করুন",
      validity: "এক সিজনের জন্য"
    },
    {
      id: "lp-2",
      categoryId: "level-up-pass",
      name: "এলিট পাস",
      nameEn: "Elite Pass", 
      price: 100,
      badge: "জনপ্রিয়",
      badgeColor: "bg-purple-500",
      description: "বোনাস রিওয়ার্ড সহ",
      validity: "এক সিজনের জন্য"
    }
  ]
};

const categoryInfo = {
  "weekly-monthly": {
    title: "সাপ্তাহিক ও মাসিক অফার",
    subtitle: "বিশেষ ছাড়ে ডায়মন্ড কিনুন",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-500"
  },
  "level-up-pass": {
    title: "লেভেল আপ পাস",
    subtitle: "আপনার লেভেল দ্রুত বাড়ান",
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-500"
  },
  "uid-topup-bd": {
    title: "UID টপআপ বাংলাদেশ",
    subtitle: "বাংলাদেশি খেলোয়াড়দের জন্য",
    icon: Gamepad2,
    gradient: "from-green-500 to-emerald-500"
  },
  "uid-topup-indonesia": {
    title: "UID টপআপ ইন্দোনেশিয়া", 
    subtitle: "ইন্দোনেশিয়ান সার্ভারের জন্য",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500"
  },
  "evo-access": {
    title: "ইভো অ্যাক্সেস",
    subtitle: "এক্সক্লুসিভ ইভো ফিচার",
    icon: Star,
    gradient: "from-indigo-500 to-purple-500"
  },
  "unipin-code": {
    title: "ইউনিপিন কোড",
    subtitle: "ইউনিপিন ভাউচার কোড", 
    icon: Gift,
    gradient: "from-red-500 to-pink-500"
  },
  "lite-offer": {
    title: "লাইট অফার",
    subtitle: "সাশ্রয়ী দামে ডায়মন্ড",
    icon: Zap,
    gradient: "from-cyan-500 to-teal-500"
  }
};

export default function CategoryPage() {
  const [, params] = useRoute("/category/:categoryId");
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState<TopupPackageType | null>(null);
  const [uid, setUid] = useState("");
  const [playerName, setPlayerName] = useState("");

  const categoryId = params?.categoryId || "";
  const packages = categoryPackages[categoryId] || [];
  const info = categoryInfo[categoryId as keyof typeof categoryInfo];

  useEffect(() => {
    // Reset selections when category changes
    setSelectedPackage(null);
    setUid("");
    setPlayerName("");
  }, [categoryId]);

  const handlePackageSelect = (pkg: TopupPackageType) => {
    setSelectedPackage(pkg);
    // Scroll to UID input section
    setTimeout(() => {
      const uidSection = document.querySelector('[data-section="uid-input"]');
      if (uidSection) {
        uidSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePaymentSuccess = (transactionId: string, method: string) => {
    console.log(`Payment successful: ${transactionId} via ${method}`);
    setSelectedPackage(null);
    setUid("");
    setPlayerName("");
  };

  if (!info) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ক্যাটেগরি খুঁজে পাওয়া যায়নি</h2>
          <Button onClick={() => setLocation("/")} className="bg-blue-600 hover:bg-blue-700">
            হোমে ফিরুন
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      
      <main>
        {/* Category Header */}
        <section className={`py-16 bg-gradient-to-br ${info.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Button
                onClick={() => setLocation("/")}
                variant="ghost"
                className="mb-6 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                হোমে ফিরুন
              </Button>
              
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {info.title}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                {info.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-gradient-to-b from-slate-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  উপলব্ধ প্যাকেজসমূহ
                </h2>
                <p className="text-slate-400">
                  আপনার পছন্দের প্যাকেজ নির্বাচন করুন
                </p>
              </div>

              {packages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-4">এই ক্যাটেগরিতে কোন প্যাকেজ পাওয়া যায়নি</div>
                  <Button onClick={() => setLocation("/")} className="bg-blue-600 hover:bg-blue-700">
                    অন্যান্য ক্যাটেগরি দেখুন
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg, index) => (
                    <Card 
                      key={pkg.id}
                      className={`group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-slate-800/80 to-slate-900/80 border transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up ${
                        selectedPackage?.id === pkg.id 
                          ? 'border-yellow-400 ring-2 ring-yellow-400/30 shadow-yellow-400/20 shadow-lg' 
                          : 'border-slate-700/50 hover:border-orange-400/50'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Badge */}
                      {pkg.badge && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <div className={`${pkg.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12`}>
                            {pkg.badge}
                          </div>
                        </div>
                      )}

                      <CardContent className="relative p-6 space-y-4">
                        {/* Package Info */}
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {pkg.name}
                          </h3>
                          {pkg.diamonds && (
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-lg font-bold text-white">{pkg.diamonds}</span>
                            </div>
                          )}
                          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            ৳{pkg.price}
                          </div>
                          {pkg.originalPrice && (
                            <div className="flex items-center justify-center space-x-2 mt-2">
                              <span className="text-slate-400 line-through">৳{pkg.originalPrice}</span>
                              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                                {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {pkg.description && (
                          <p className="text-sm text-slate-400 text-center">{pkg.description}</p>
                        )}

                        {/* Validity */}
                        {pkg.validity && (
                          <p className="text-xs text-slate-500 text-center">{pkg.validity}</p>
                        )}

                        {/* Value indicator for diamond packages */}
                        {pkg.diamonds && (
                          <div className="text-center text-xs text-slate-400">
                            ৳{(pkg.price / pkg.diamonds).toFixed(2)} per Diamond
                          </div>
                        )}

                        {/* Select Button */}
                        <Button 
                          onClick={() => handlePackageSelect(pkg)}
                          className={`w-full py-3 font-bold transition-all duration-300 transform hover:scale-105 ${
                            selectedPackage?.id === pkg.id
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
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
              )}
            </div>
          </div>
        </section>

        {/* UID Input Section */}
        {selectedPackage && (
          <div data-section="uid-input">
            <FreefireUidInput 
              uid={uid}
              setUid={setUid}
              playerName={playerName}
              setPlayerName={setPlayerName}
            />
          </div>
        )}

        {/* Payment Section */}
        {selectedPackage && (
          <FreefirePayment 
            selectedPackage={selectedPackage}
            uid={uid}
            playerName={playerName}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
