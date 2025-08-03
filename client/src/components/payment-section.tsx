import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/hooks/use-firestore";
import { useAuth } from "@/hooks/use-auth";
import { signInWithGoogle } from "@/lib/firebase";
import type { DiamondPackageType } from "@shared/schema";

interface PaymentSectionProps {
  selectedPackage: DiamondPackageType | null;
  playerId: string;
  playerName: string;
  onOrderComplete: () => void;
}

export default function PaymentSection({ 
  selectedPackage, 
  playerId, 
  playerName, 
  onOrderComplete 
}: PaymentSectionProps) {
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const { submitOrder, loading } = useCreateOrder();
  const { toast } = useToast();

  const handleSubmitOrder = async () => {
    if (!selectedPackage) {
      toast({
        title: "ত্রুটি",
        description: "দয়া করে একটি প্যাকেজ নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    if (!playerId || playerId.length < 8) {
      toast({
        title: "ত্রুটি", 
        description: "দয়া করে সঠিক প্লেয়ার আইডি প্রদান করুন",
        variant: "destructive"
      });
      return;
    }

    if (!transactionId || transactionId.length < 10) {
      toast({
        title: "ত্রুটি",
        description: "দয়া করে সঠিক Transaction ID প্রদান করুন",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "অর্ডার করতে দয়া করে লগইন করুন",
        variant: "destructive"
      });
      return;
    }

    try {
      await submitOrder({
        playerId,
        playerName,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        amount: selectedPackage.price,
        transactionId
      });

      toast({
        title: "সফল!",
        description: "আপনার অর্ডার সফলভাবে সাবমিট হয়েছে",
      });

      // Clear form
      setTransactionId("");
      onOrderComplete();
      
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "অর্ডার সাবমিট করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।",
        variant: "destructive"
      });
    }
  };

  const handleLoginFirst = () => {
    signInWithGoogle().catch(console.error);
  };

  const isFormValid = selectedPackage && playerId.length >= 8 && transactionId.length >= 10;

  return (
    <section className="py-12 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold text-yellow-400 mb-6 text-center">পেমেন্ট করুন</h4>
              
              {/* Payment Instructions */}
              <div className="bg-slate-900 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-4">পেমেন্ট নির্দেশনা:</h5>
                
                {/* bKash Payment */}
                <div className="flex items-start space-x-4 mb-4 p-4 bg-pink-900/20 border border-pink-500/30 rounded-lg">
                  <div className="bg-pink-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-pink-400 mb-1">bKash পেমেন্ট</div>
                    <div className="text-sm text-slate-300 mb-2">নম্বর: <span className="font-mono text-yellow-400">01609189135</span></div>
                    <div className="text-xs text-slate-400">Send Money অপশন ব্যবহার করুন</div>
                  </div>
                </div>

                {/* Nagad Payment */}
                <div className="flex items-start space-x-4 mb-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-orange-400 mb-1">Nagad পেমেন্ট</div>
                    <div className="text-sm text-slate-300 mb-2">নম্বর: <span className="font-mono text-yellow-400">01609189135</span></div>
                    <div className="text-xs text-slate-400">Send Money অপশন ব্যবহার করুন</div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-slate-300">
                      <strong>গুরুত্বপূর্ণ:</strong> পেমেন্ট করার পর অবশ্যই Transaction ID সংরক্ষণ করুন এবং নিচে প্রদান করুন।
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction ID Input */}
              <div className="mb-6">
                <Label htmlFor="transactionId" className="block text-sm font-medium text-slate-300 mb-2">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Transaction ID
                </Label>
                <Input 
                  id="transactionId"
                  type="text" 
                  placeholder="Transaction ID লিখুন"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Submit Button */}
              {user ? (
                <Button 
                  onClick={handleSubmitOrder}
                  disabled={!isFormValid || loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white py-4 font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      প্রক্রিয়াকরণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      অর্ডার সাবমিট করুন
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={handleLoginFirst}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white py-4 font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  অর্ডার করতে লগইন করুন
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
