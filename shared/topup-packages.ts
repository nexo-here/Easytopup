import type { TopupPackageType } from "./schema";

// AG TOPUP standardized diamond packages with accurate Bangladeshi Taka pricing
export const agTopupPackages: TopupPackageType[] = [
  // Subscription Plans
  {
    id: "weekly-subscription",
    categoryId: "subscription",
    name: "সাপ্তাহিক সাবস্ক্রিপশন",
    nameEn: "Weekly",
    price: 155,
    description: "৭ দিনের প্রিমিয়াম সুবিধা",
    validity: "৭ দিনের জন্য বৈধ"
  },
  {
    id: "monthly-subscription",
    categoryId: "subscription", 
    name: "মাসিক সাবস্ক্রিপশন",
    nameEn: "Monthly",
    price: 760,
    description: "৩০ দিনের প্রিমিয়াম সুবিধা",
    validity: "৩০ দিনের জন্য বৈধ"
  },
  
  // Diamond Packages - AG TOPUP Standard Pricing
  {
    id: "25-diamond",
    categoryId: "diamond",
    name: "২৫ Diamond",
    nameEn: "25 Diamond",
    diamonds: 25,
    price: 23,
    description: "নতুন খেলোয়াড়দের জন্য স্টার্টার প্যাক"
  },
  {
    id: "50-diamond",
    categoryId: "diamond",
    name: "৫০ Diamond", 
    nameEn: "50 Diamond",
    diamonds: 50,
    price: 37,
    description: "ছোট রিচার্জের জন্য আদর্শ"
  },
  {
    id: "115-diamond",
    categoryId: "diamond",
    name: "১১৫ Diamond",
    nameEn: "115 Diamond", 
    diamonds: 115,
    price: 78,
    description: "মধ্যম মানের প্যাকেজ"
  },
  {
    id: "240-diamond",
    categoryId: "diamond",
    name: "২৪০ Diamond",
    nameEn: "240 Diamond",
    diamonds: 240,
    price: 158,
    description: "জনপ্রিয় চয়েস"
  },
  {
    id: "355-diamond",
    categoryId: "diamond",
    name: "৩৫৫ Diamond",
    nameEn: "355 Diamond",
    diamonds: 355,
    price: 235,
    description: "ভালো মূল্যের প্যাকেজ"
  },
  {
    id: "480-diamond",
    categoryId: "diamond",
    name: "৪৮০ Diamond",
    nameEn: "480 Diamond",
    diamonds: 480,
    price: 313,
    description: "স্ট্যান্ডার্ড প্যাকেজ"
  },
  {
    id: "505-diamond",
    categoryId: "diamond",
    name: "৫০৫ Diamond",
    nameEn: "505 Diamond",
    diamonds: 505,
    price: 348,
    badge: "জনপ্রিয়",
    badgeColor: "bg-orange-500",
    description: "সবচেয়ে বিক্রিত প্যাকেজ"
  },
  {
    id: "610-diamond",
    categoryId: "diamond",
    name: "৬১০ Diamond",
    nameEn: "610 Diamond",
    diamonds: 610,
    price: 397,
    description: "উন্নত গেমারদের জন্য"
  },
  {
    id: "850-diamond",
    categoryId: "diamond",
    name: "৮৫০ Diamond",
    nameEn: "850 Diamond",
    diamonds: 850,
    price: 548,
    description: "প্রিমিয়াম প্যাকেজ"
  },
  {
    id: "1090-diamond",
    categoryId: "diamond",
    name: "১০৯০ Diamond",
    nameEn: "1090 Diamond",
    diamonds: 1090,
    price: 730,
    badge: "বেস্ট সেলার",
    badgeColor: "bg-purple-500",
    description: "দক্ষ খেলোয়াড়দের পছন্দ"
  },
  {
    id: "1240-diamond",
    categoryId: "diamond",
    name: "১২৪০ Diamond", 
    nameEn: "1240 Diamond",
    diamonds: 1240,
    price: 788,
    description: "উচ্চ-মানের প্যাকেজ"
  },
  {
    id: "1850-diamond",
    categoryId: "diamond",
    name: "১৮৫০ Diamond",
    nameEn: "1850 Diamond",
    diamonds: 1850,
    price: 1170,
    description: "বড় রিচার্জ প্যাকেজ"
  },
  {
    id: "2090-diamond",
    categoryId: "diamond",
    name: "২০৯০ Diamond",
    nameEn: "2090 Diamond",
    diamonds: 2090,
    price: 1330,
    description: "মেগা প্যাকেজ"
  },
  {
    id: "2530-diamond",
    categoryId: "diamond",
    name: "২৫৩০ Diamond",
    nameEn: "2530 Diamond",
    diamonds: 2530,
    price: 1560,
    badge: "বেস্ট ভ্যালু",
    badgeColor: "bg-yellow-500",
    description: "সর্বোচ্চ সাশ্রয়ী প্যাকেজ"
  },
  {
    id: "3770-diamond",
    categoryId: "diamond",
    name: "৩৭৭০ Diamond",
    nameEn: "3770 Diamond",
    diamonds: 3770,
    price: 2360,
    description: "সুপার প্যাকেজ"
  },
  {
    id: "4010-diamond",
    categoryId: "diamond",
    name: "৪০১০ Diamond",
    nameEn: "4010 Diamond",
    diamonds: 4010,
    price: 2490,
    description: "আল্ট্রা প্যাকেজ"
  },
  {
    id: "5060-diamond",
    categoryId: "diamond",
    name: "৫০৬০ Diamond",
    nameEn: "5060 Diamond",
    diamonds: 5060,
    price: 3120,
    badge: "প্রিমিয়াম",
    badgeColor: "bg-red-500",
    description: "পেশাদার খেলোয়াড়দের জন্য সর্বোচ্চ প্যাকেজ"
  }
];

// JSON format for API integration
export const agTopupPackagesJSON = JSON.stringify(
  agTopupPackages.map(pkg => ({
    type: pkg.diamonds ? "diamond" : "subscription",
    label: pkg.nameEn,
    price: pkg.price,
    diamonds: pkg.diamonds,
    description: pkg.description
  })),
  null,
  2
);

// Get packages by category
export const getPackagesByCategory = (categoryId: string): TopupPackageType[] => {
  return agTopupPackages.filter(pkg => pkg.categoryId === categoryId);
};

// Get diamond packages only
export const getDiamondPackages = (): TopupPackageType[] => {
  return agTopupPackages.filter(pkg => pkg.diamonds !== undefined);
};

// Get subscription packages only  
export const getSubscriptionPackages = (): TopupPackageType[] => {
  return agTopupPackages.filter(pkg => pkg.categoryId === "subscription");
};

// Pricing validation function
export const validatePricing = (packageId: string, expectedPrice: number): boolean => {
  const pkg = agTopupPackages.find(p => p.id === packageId);
  return pkg ? pkg.price === expectedPrice : false;
};

// Get package by ID
export const getPackageById = (packageId: string): TopupPackageType | undefined => {
  return agTopupPackages.find(pkg => pkg.id === packageId);
};