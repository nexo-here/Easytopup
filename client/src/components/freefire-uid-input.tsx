import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, Check, AlertCircle, Loader2 } from "lucide-react";

interface FreefireUidInputProps {
  uid: string;
  setUid: (uid: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
}

export default function FreefireUidInput({ 
  uid, 
  setUid, 
  playerName, 
  setPlayerName 
}: FreefireUidInputProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Mock validation function (in real app, this would call Free Fire API)
  const validateUID = async (uidValue: string) => {
    // Basic validation
    if (uidValue.length < 8 || uidValue.length > 12) {
      setValidationError("UID ৮-১২ সংখ্যার হতে হবে");
      return false;
    }
    
    if (!/^\d+$/.test(uidValue)) {
      setValidationError("শুধুমাত্র সংখ্যা ব্যবহার করুন");
      return false;
    }

    // Simulate API call
    setIsValidating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock player data based on UID
      const mockNames = [
        "FF_CHAMPION",
        "DIAMOND_KING", 
        "FIRE_MASTER",
        "LEGEND_PLAYER",
        "PRO_GAMER",
        "ELITE_SHOOTER"
      ];
      
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      setPlayerName(`${randomName}#${uidValue.slice(-4)}`);
      setValidationError(null);
      return true;
    } catch (error) {
      setValidationError("UID যাচাই করতে সমস্যা হয়েছে");
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (uid.length >= 8) {
        validateUID(uid).then(setIsValid);
      } else {
        setIsValid(false);
        setPlayerName("");
        setValidationError(null);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [uid, setPlayerName]);

  const handleUidChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    setUid(numericValue);
    setIsValid(false);
    setValidationError(null);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-black to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  Player Information
                </h4>
                <p className="text-slate-400">আপনার Free Fire UID লিখুন</p>
              </div>

              {/* UID Input */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="uid" className="block text-sm font-medium text-slate-300 mb-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Free Fire UID</span>
                    </div>
                  </Label>
                  
                  <div className="relative">
                    <Input 
                      id="uid"
                      type="text" 
                      placeholder="১২৩৪৫৬৭৮৯"
                      value={uid}
                      onChange={(e) => handleUidChange(e.target.value)}
                      maxLength={12}
                      className={`bg-slate-900/80 border text-white text-lg text-center font-mono tracking-wider py-4 transition-all duration-300 ${
                        validationError 
                          ? 'border-red-500 focus:ring-red-500' 
                          : isValid 
                          ? 'border-green-500 focus:ring-green-500' 
                          : 'border-slate-600 focus:ring-blue-500'
                      }`}
                    />
                    
                    {/* Status Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isValidating ? (
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                      ) : isValid ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : validationError && uid.length > 0 ? (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      ) : null}
                    </div>
                  </div>

                  {/* Character Count */}
                  <div className="text-right text-xs text-slate-500 mt-1">
                    {uid.length}/12 অক্ষর
                  </div>
                </div>

                {/* Validation Messages */}
                {isValidating && (
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                      <span className="text-sm text-blue-300">UID যাচাই করা হচ্ছে...</span>
                    </div>
                  </div>
                )}

                {validationError && !isValidating && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-300">{validationError}</span>
                    </div>
                  </div>
                )}

                {isValid && playerName && !isValidating && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-green-400 font-medium mb-1">Player Found</div>
                        <div className="text-lg font-bold text-white">{playerName}</div>
                        <div className="text-xs text-green-300">UID: {uid}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* UID Guidelines */}
              <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <h6 className="text-sm font-medium text-slate-300 mb-2">UID কোথায় পাবেন:</h6>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Free Fire গেমে প্রোফাইল সেকশনে যান</li>
                  <li>• আপনার নামের নিচে UID নম্বর দেখতে পাবেন</li>
                  <li>• এটি ৮-১২ সংখ্যার একটি ইউনিক নম্বর</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}