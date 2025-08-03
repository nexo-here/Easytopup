import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Smartphone, CreditCard, QrCode, CheckCircle, AlertCircle, Zap } from "lucide-react";
import type { DiamondPackageType } from "@shared/schema";

interface FreefirePaymentProps {
  selectedPackage: DiamondPackageType | null;
  uid: string;
  playerName: string;
  onPaymentSuccess?: (transactionId: string, method: string) => void;
}

type PaymentMethod = "bkash" | "nagad" | "rocket";

interface PaymentMethodInfo {
  name: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const paymentMethods: Record<PaymentMethod, PaymentMethodInfo> = {
  bkash: {
    name: "bKash",
    icon: <Smartphone className="w-5 h-5" />,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    gradientFrom: "from-pink-500/20",
    gradientTo: "to-pink-600/20"
  },
  nagad: {
    name: "Nagad",
    icon: <CreditCard className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    gradientFrom: "from-orange-500/20",
    gradientTo: "to-orange-600/20"
  },
  rocket: {
    name: "Rocket",
    icon: <Zap className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-purple-600/20"
  }
};

export default function FreefirePayment({ 
  selectedPackage, 
  uid, 
  playerName, 
  onPaymentSuccess 
}: FreefirePaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ transactionId?: string }>({});
  
  const { toast } = useToast();
  const copyTimeoutRef = useRef<NodeJS.Timeout>();

  const PAYMENT_NUMBER = "01609189135";

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER);
      setIsCopied(true);
      
      toast({
        title: "কপি সফল!",
        description: "পেমেন্ট নাম্বার কপি হয়েছে",
      });

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "ত্রুটি",
        description: "কপি করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    }
  };

  const generateQRCode = (method: PaymentMethod) => {
    const qrData = `${paymentMethods[method].name}:${PAYMENT_NUMBER}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  const validateTransactionId = (value: string) => {
    if (!value.trim()) {
      return "Transaction ID প্রয়োজন";
    }
    if (value.length < 10) {
      return "Transaction ID কমপক্ষে ১০ অক্ষর হতে হবে";
    }
    if (!/^[A-Za-z0-9]+$/.test(value)) {
      return "শুধুমাত্র ইংরেজি অক্ষর ও সংখ্যা ব্যবহার করুন";
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!selectedPackage) {
      toast({
        title: "ত্রুটি",
        description: "দয়া করে একটি Diamond প্যাকেজ নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    if (!uid || uid.length < 8) {
      toast({
        title: "ত্রুটি", 
        description: "দয়া করে সঠিক Free Fire UID প্রদান করুন",
        variant: "destructive"
      });
      return;
    }

    if (!selectedMethod) {
      toast({
        title: "ত্রুটি",
        description: "পেমেন্ট পদ্ধতি নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    const transactionError = validateTransactionId(transactionId);
    if (transactionError) {
      setErrors({ transactionId: transactionError });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccessModal(true);
      onPaymentSuccess?.(transactionId, selectedMethod);
      
      // Reset form
      setTransactionId("");
      setSelectedMethod(null);
      setShowQR(false);
      
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "পেমেন্ট সাবমিট করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPackage || !uid) {
    return (
      <section className="py-12 bg-gradient-to-b from-slate-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-400 mb-2">Payment Section</h4>
            <p className="text-slate-500">প্রথমে Diamond প্যাকেজ নির্বাচন করুন এবং UID লিখুন</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  Payment Information
                </h4>
                <p className="text-slate-400">আপনার অর্ডার সম্পূর্ণ করুন</p>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <h5 className="text-lg font-bold text-yellow-400 mb-4">Order Summary</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Package:</span>
                    <span className="font-bold text-white">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Player:</span>
                    <span className="font-mono text-white">{playerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">UID:</span>
                    <span className="font-mono text-white">{uid}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total:</span>
                      <span className="text-2xl font-bold text-yellow-400">৳{selectedPackage.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-slate-300">
                  পেমেন্ট পদ্ধতি নির্বাচন করুন
                </Label>
                <Select value={selectedMethod || ""} onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600/30 text-white py-4">
                    <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600/30">
                    {Object.entries(paymentMethods).map(([key, method]) => (
                      <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                        <div className="flex items-center space-x-3">
                          <span className={method.color}>{method.icon}</span>
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Number */}
              {selectedMethod && (
                <div className="space-y-4">
                  <Label className="text-lg font-medium text-slate-300">
                    পেমেন্ট নাম্বার
                  </Label>
                  <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${paymentMethods[selectedMethod].bgColor} rounded-xl flex items-center justify-center`}>
                        <span className={paymentMethods[selectedMethod].color}>
                          {paymentMethods[selectedMethod].icon}
                        </span>
                      </div>
                      <div>
                        <div className="text-xl font-bold font-mono text-yellow-400">
                          {PAYMENT_NUMBER}
                        </div>
                        <div className="text-sm text-slate-400">
                          {paymentMethods[selectedMethod].name} এ Send Money করুন
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleCopyNumber}
                      size="sm"
                      className={`transition-all duration-300 ${
                        isCopied 
                          ? 'bg-green-500/20 text-green-400 scale-110' 
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      }`}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 animate-bounce" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* QR Code Section */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">অথবা QR কোড স্ক্যান করুন</span>
                    <Button
                      onClick={() => setShowQR(!showQR)}
                      size="sm"
                      variant="ghost"
                      className="text-blue-400 hover:bg-blue-500/10"
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      {showQR ? 'লুকান' : 'দেখান'}
                    </Button>
                  </div>
                  
                  {showQR && (
                    <div className="flex justify-center p-6 bg-white rounded-xl">
                      <img 
                        src={generateQRCode(selectedMethod)} 
                        alt="QR Code"
                        className="w-40 h-40"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Transaction ID Input */}
              <div className="space-y-4">
                <Label htmlFor="transactionId" className="text-lg font-medium text-slate-300">
                  Transaction ID
                </Label>
                <div className="space-y-2">
                  <Input
                    id="transactionId"
                    value={transactionId}
                    onChange={(e) => {
                      setTransactionId(e.target.value);
                      if (errors.transactionId) {
                        setErrors({ ...errors, transactionId: undefined });
                      }
                    }}
                    placeholder="Transaction ID লিখুন (পেমেন্ট করার পর)"
                    className={`bg-slate-900/80 border text-white py-4 ${
                      errors.transactionId ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
                    }`}
                  />
                  {errors.transactionId && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.transactionId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!selectedMethod || !transactionId || isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>প্রক্রিয়াকরণ হচ্ছে...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>পেমেন্ট সম্পূর্ণ করুন</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <DialogTitle className="text-2xl text-green-400">
              পেমেন্ট সফল!
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-lg">
              আপনার {selectedPackage.diamonds} Diamond অর্ডার সফলভাবে সাবমিট হয়েছে। 
              ১-৫ মিনিটের মধ্যে ডায়মন্ড আপনার অ্যাকাউন্টে পৌঁছে যাবে।
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              ধন্যবাদ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}