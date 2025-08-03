import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Calendar, Trophy, Gamepad2, Globe, Star, Gift, Zap } from "lucide-react";
import type { TopupCategoryType } from "@shared/schema";

const categories: TopupCategoryType[] = [
  {
    id: "weekly-monthly",
    name: "সাপ্তাহিক ও মাসিক অফার",
    nameEn: "Weekly Monthly Offer",
    description: "বিশেষ ছাড়ে ডায়মন্ড কিনুন",
    icon: "calendar",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-400",
    route: "/category/weekly-monthly"
  },
  {
    id: "level-up-pass",
    name: "লেভেল আপ পাস",
    nameEn: "Level Up Pass",
    description: "আপনার লেভেল দ্রুত বাড়ান",
    icon: "trophy",
    bgGradient: "from-yellow-500/20 to-orange-500/20",
    textColor: "text-yellow-400",
    route: "/category/level-up-pass"
  },
  {
    id: "uid-topup-bd",
    name: "UID টপআপ বাংলাদেশ",
    nameEn: "UID Topup BD",
    description: "বাংলাদেশি খেলোয়াড়দের জন্য",
    icon: "gamepad",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    textColor: "text-green-400",
    route: "/category/uid-topup-bd"
  },
  {
    id: "uid-topup-indonesia",
    name: "UID টপআপ ইন্দোনেশিয়া",
    nameEn: "UID Topup Indonesia",
    description: "ইন্দোনেশিয়ান সার্ভারের জন্য",
    icon: "globe",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-400",
    route: "/category/uid-topup-indonesia"
  },
  {
    id: "evo-access",
    name: "ইভো অ্যাক্সেস",
    nameEn: "Evo Access",
    description: "এক্সক্লুসিভ ইভো ফিচার",
    icon: "star",
    bgGradient: "from-indigo-500/20 to-purple-500/20",
    textColor: "text-indigo-400",
    route: "/category/evo-access"
  },
  {
    id: "unipin-code",
    name: "ইউনিপিন কোড",
    nameEn: "Unipin Code",
    description: "ইউনিপিন ভাউচার কোড",
    icon: "gift",
    bgGradient: "from-red-500/20 to-pink-500/20",
    textColor: "text-red-400",
    route: "/category/unipin-code"
  },
  {
    id: "lite-offer",
    name: "লাইট অফার",
    nameEn: "Lite Offer",
    description: "সাশ্রয়ী দামে ডায়মন্ড",
    icon: "zap",
    bgGradient: "from-cyan-500/20 to-teal-500/20",
    textColor: "text-cyan-400",
    route: "/category/lite-offer"
  }
];

const iconMap = {
  calendar: Calendar,
  trophy: Trophy,
  gamepad: Gamepad2,
  globe: Globe,
  star: Star,
  gift: Gift,
  zap: Zap,
};

export default function CategoryGrid() {
  const [, setLocation] = useLocation();

  const handleCategoryClick = (category: TopupCategoryType) => {
    setLocation(category.route);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              টপআপ ক্যাটেগরি
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              আপনার পছন্দের প্যাকেজ নির্বাচন করুন
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              
              return (
                <Card 
                  key={category.id}
                  className={`group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <CardContent className="relative p-6 text-center space-y-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.bgGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${category.textColor}`} />
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>

                    {/* Button */}
                    <Button 
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-orange-500 hover:to-red-500 text-white border-0 transition-all duration-300 transform group-hover:scale-105`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>অফার দেখুন</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">১০০০+</div>
              <div className="text-slate-400">সন্তুষ্ট গ্রাহক</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">২৪/৭</div>
              <div className="text-slate-400">গ্রাহক সেবা</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">৯৯%</div>
              <div className="text-slate-400">সফল লেনদেন</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}