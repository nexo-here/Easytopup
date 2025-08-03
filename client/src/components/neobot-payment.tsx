import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Smartphone, CreditCard, Zap, QrCode, CheckCircle, AlertCircle } from "lucide-react";

interface NeoBotPaymentProps {
  onPaymentSuccess?: (transactionId: string, method: string) => void;
  amount?: number;
  serviceName?: string;
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

export default function NeoBotPayment({ 
  onPaymentSuccess, 
  amount = 0, 
  serviceName = "NeoBot Service" 
}: NeoBotPaymentProps) {
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

      // Clear previous timeout
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      // Reset copy state after animation
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
    // Generate QR code URL (using a QR code API service)
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
    // Validate form
    const transactionError = validateTransactionId(transactionId);
    
    if (!selectedMethod) {
      toast({
        title: "ত্রুটি",
        description: "পেমেন্ট পদ্ধতি নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    if (transactionError) {
      setErrors({ transactionId: transactionError });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccessModal(true);
      
      // Call success callback
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

  const currentMethod = selectedMethod ? paymentMethods[selectedMethod] : null;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Main Payment Card with Glassmorphism */}
      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5 shadow-2xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 animate-pulse" />
        
        <CardContent className="relative p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-2xl font-bold text-white">NB</div>
            </div>
            <h3 className="text-xl font-bold text-white">NeoBot Payment</h3>
            <p className="text-sm text-slate-400">{serviceName}</p>
            {amount > 0 && (
              <div className="text-2xl font-bold text-yellow-400">৳{amount}</div>
            )}
          </div>

          {/* Payment Number Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-300">
              পেমেন্ট নাম্বার
            </Label>
            <div className="flex items-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30">
              <div className="flex-1">
                <div className="text-lg font-mono font-bold text-yellow-400">
                  {PAYMENT_NUMBER}
                </div>
                <div className="text-xs text-slate-400">
                  Send Money করুন
                </div>
              </div>
              <Button
                onClick={handleCopyNumber}
                size="sm"
                variant="ghost"
                className={`transition-all duration-300 ${
                  isCopied 
                    ? 'bg-green-500/20 text-green-400 scale-110' 
                    : 'hover:bg-white/10 text-slate-400'
                }`}
              >
                {isCopied ? (
                  <Check className="w-4 h-4 animate-bounce" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-300">
              পেমেন্ট পদ্ধতি
            </Label>
            <Select value={selectedMethod || ""} onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600/30 text-white">
                <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600/30">
                {Object.entries(paymentMethods).map(([key, method]) => (
                  <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                    <div className="flex items-center space-x-2">
                      <span className={method.color}>{method.icon}</span>
                      <span>{method.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* QR Code Section */}
          {selectedMethod && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-300">
                  QR Code
                </Label>
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
                <div className="flex justify-center p-4 bg-white rounded-xl">
                  <img 
                    src={generateQRCode(selectedMethod)} 
                    alt="QR Code"
                    className="w-32 h-32"
                  />
                </div>
              )}
            </div>
          )}

          {/* Transaction ID Input */}
          <div className="space-y-3">
            <Label htmlFor="transactionId" className="text-sm font-medium text-slate-300">
              Transaction ID
            </Label>
            <div className="space-y-1">
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  if (errors.transactionId) {
                    setErrors({ ...errors, transactionId: undefined });
                  }
                }}
                placeholder="Transaction ID লিখুন"
                className={`bg-slate-800/50 border-slate-600/30 text-white placeholder-slate-400 ${
                  errors.transactionId ? 'border-red-500' : ''
                }`}
              />
              {errors.transactionId && (
                <div className="flex items-center space-x-1 text-red-400 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.transactionId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedMethod || !transactionId || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>প্রক্রিয়াকরণ...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>পেমেন্ট সাবমিট</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="text-xl text-green-400">
              পেমেন্ট সফল!
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              আপনার পেমেন্ট সফলভাবে সাবমিট হয়েছে। আমরা শীঘ্রই যাচাই করে নেটিফিকেশন পাঠাবো।
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              ধন্যবাদ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}