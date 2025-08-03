import { Link } from "wouter";
import { signInWithGoogle, signOutUser } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { useState } from "react";

export default function Header() {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    signInWithGoogle().catch(console.error);
  };

  const handleLogout = () => {
    signOutUser().catch(console.error);
  };

  return (
    <header className="bg-slate-800 shadow-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-400">EasyTopUp</h1>
              <p className="text-xs text-slate-400">Free Fire Diamond</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors font-medium">
              হোম
            </Link>
            <a href="#topup" className="text-white hover:text-yellow-400 transition-colors font-medium">
              টপআপ
            </a>
            <a href="#contact" className="text-white hover:text-yellow-400 transition-colors font-medium">
              যোগাযোগ
            </a>
          </nav>

          {/* User Profile / Login */}
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            {loading ? (
              <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-slate-700 px-3 py-2 rounded-lg">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="User Avatar" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-xs">{user.displayName?.[0] || "U"}</span>
                    </div>
                  )}
                  <span className="text-sm text-white hidden sm:block">
                    {user.displayName || "User"}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  লগআউট
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                লগইন
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-white hover:text-yellow-400 transition-colors font-medium py-2">
                হোম
              </Link>
              <a href="#topup" className="text-white hover:text-yellow-400 transition-colors font-medium py-2">
                টপআপ
              </a>
              <a href="#contact" className="text-white hover:text-yellow-400 transition-colors font-medium py-2">
                যোগাযোগ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
