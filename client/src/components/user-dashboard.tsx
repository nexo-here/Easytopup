import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useUserOrders } from "@/hooks/use-firestore";
import { format } from "date-fns";

export default function UserDashboard() {
  const { user } = useAuth();
  const { orders, loading, error } = useUserOrders();

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'সম্পন্ন';
      case 'pending':
        return 'অপেক্ষমান';
      case 'failed':
        return 'ব্যর্থ';
      default:
        return 'অজানা';
    }
  };

  return (
    <section className="py-12 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-yellow-400 mb-6 text-center">আপনার অর্ডার হিস্টরি</h4>
          
          {/* User Info Card */}
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="User Avatar" 
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white">{user.displayName?.[0] || "U"}</span>
                  </div>
                )}
                <div>
                  <div className="text-lg font-bold text-white">{user.displayName || "User"}</div>
                  <div className="text-sm text-slate-400">{user.email}</div>
                  <div className="text-sm text-yellow-400">UID: {user.uid.substring(0, 8)}...</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-slate-400">অর্ডার লোড হচ্ছে...</p>
              </div>
            ) : error ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <p className="text-red-400">{error}</p>
                </CardContent>
              </Card>
            ) : orders.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-slate-400">এখনো কোনো অর্ডার করেননি</p>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-white">{order.packageName}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-400">৳{order.amount}</div>
                        <div className={`text-xs ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400 mb-2">
                      Player ID: <span className="font-mono text-slate-300">{order.playerId}</span>
                      {order.playerName && (
                        <span className="ml-4">Player: <span className="text-slate-300">{order.playerName}</span></span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400 mb-2">
                      Transaction ID: <span className="font-mono text-slate-300">{order.transactionId}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {format(order.createdAt, "d MMMM, yyyy 'at' h:mm a")}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
