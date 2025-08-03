export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background with Free Fire Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Free Fire Logo and Branding */}
        <div className="mb-8 animate-fade-in-up">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Free Fire Logo Placeholder with Fire Effect */}
            <div className="w-full h-full rounded-2xl shadow-2xl bg-gradient-to-br from-orange-500 via-red-500 to-red-600 flex items-center justify-center relative overflow-hidden">
              {/* Fire Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 opacity-80 animate-pulse" />
              
              {/* Logo Icon */}
              <svg className="w-16 h-16 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM7.5 9l4.5 4.5L7.5 18V9zm9 9l-4.5-4.5L16.5 9v9z"/>
              </svg>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-transparent rounded-2xl" />
            </div>
            
            {/* Floating Particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Free Fire
          </h1>
          <div className="text-2xl md:text-3xl font-bold text-white mb-2">Diamond Top-Up</div>
        </div>

        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          দ্রুততম ও নিরাপদ Free Fire Diamond টপআপ সেবা। তাৎক্ষণিক ডেলিভারি গ্যারান্টি।
        </p>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-400 mb-2">5M+</div>
            <div className="text-orange-100 text-sm">সন্তুষ্ট গ্রাহক</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-orange-100 text-sm">সফল ট্রানজেকশন</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-orange-100 text-sm">কাস্টমার সাপোর্ট</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12">
          <div className="animate-bounce">
            <svg className="w-6 h-6 mx-auto text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-orange-200 text-sm mt-2">নিচে স্ক্রল করুন</p>
        </div>
      </div>
    </section>
  );
}
