import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { DiamondPackageType } from "@shared/schema";

interface PlayerInfoProps {
  selectedPackage: DiamondPackageType | null;
  playerId: string;
  setPlayerId: (id: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
}

export default function PlayerInfo({ 
  selectedPackage, 
  playerId, 
  setPlayerId, 
  playerName, 
  setPlayerName 
}: PlayerInfoProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // Mock player name validation
  useEffect(() => {
    if (playerId.length >= 8) {
      setIsValidating(true);
      const timer = setTimeout(() => {
        setPlayerName(`Player#${playerId.substring(0, 4)}`);
        setIsValidated(true);
        setIsValidating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsValidated(false);
      setPlayerName("");
    }
  }, [playerId, setPlayerName]);

  return (
    <section id="player-section" className="py-12 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold text-yellow-400 mb-4 text-center">প্লেয়ার তথ্য</h4>
              
              {/* Selected Package Display */}
              {selectedPackage && (
                <div className="bg-slate-900 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-slate-400">নির্বাচিত প্যাকেজ:</span>
                      <div className="text-lg font-bold text-yellow-400">{selectedPackage.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">৳{selectedPackage.price}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Player ID Input */}
              <div className="mb-6">
                <Label htmlFor="playerId" className="block text-sm font-medium text-slate-300 mb-2">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  প্লেয়ার আইডি (UID)
                </Label>
                <Input 
                  id="playerId"
                  type="text" 
                  placeholder="আপনার Free Fire UID লিখুন"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Player Name Display (Auto-filled after UID validation) */}
              {isValidating && (
                <div className="mb-6">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                      <span className="text-sm text-slate-300">প্লেয়ার তথ্য যাচাই করা হচ্ছে...</span>
                    </div>
                  </div>
                </div>
              )}

              {isValidated && playerName && (
                <div className="mb-6">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="text-sm text-slate-400">প্লেয়ার নাম:</div>
                        <div className="text-lg font-bold text-white">{playerName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
