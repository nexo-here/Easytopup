import NeoBotPayment from "@/components/neobot-payment";

export default function NeoBotDemo() {
  const handlePaymentSuccess = (transactionId: string, method: string) => {
    console.log(`Payment successful: ${transactionId} via ${method}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">NeoBot Payment</h1>
          <p className="text-slate-400">Premium Glassmorphism Payment Component</p>
        </div>
        
        <NeoBotPayment
          amount={350}
          serviceName="Premium Bot Subscription"
          onPaymentSuccess={handlePaymentSuccess}
        />
        
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>This is a demo of the NeoBot payment component</p>
          <p>Features: Glassmorphism design, QR codes, copy functionality, validation</p>
        </div>
      </div>
    </div>
  );
}