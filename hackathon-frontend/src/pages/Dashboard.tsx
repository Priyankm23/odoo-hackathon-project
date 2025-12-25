import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, RefreshCw, Star, Clock, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Item {
  _id: string;
  title: string;
  images: string[];
  status: string;
  createdAt: string;
}

interface SwapRequest {
  _id: string;
  item: {
    _id: string;
    title: string;
    images: string[];
  };
  requester?: {
    name: string;
  };
  owner?: {
    name: string;
  };
  status: string;
  createdAt: string;
}

interface Redemption {
  _id: string;
  item: {
    _id: string;
    title: string;
    images: string[];
  };
  pointsUsed: number;
  createdAt: string;
}

interface SwapData {
  sent: SwapRequest[];
  received: SwapRequest[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [swaps, setSwaps] = useState<SwapData>({ sent: [], received: [] });
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [itemsRes, swapsRes, redemptionsRes] = await Promise.all([
        fetch('http://localhost:5000/api/v1/items/user/my-items', {
          credentials: 'include'
        }),
        fetch('http://localhost:5000/api/v1/swaps/user/my-swaps', {
          credentials: 'include'
        }),
        fetch('http://localhost:5000/api/v1/redeem/user/my-redeems', {
          credentials: 'include'
        })
      ]);

      if (itemsRes.ok) {
        const items = await itemsRes.json();
        setMyItems(items);
      }

      if (swapsRes.ok) {
        const swapData = await swapsRes.json();
        setSwaps(swapData);
      }

      if (redemptionsRes.ok) {
        const redemptionData = await redemptionsRes.json();
        setRedemptions(redemptionData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapResponse = async (swapId: string, status: 'accepted' | 'rejected') => {
    try {
      const response = await fetch(`/api/v1/swaps/${swapId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating swap status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'swapped':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 flex flex-col">
      <div className="flex-grow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 text-lg">Manage your items and track your swapping activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border-l-4 border-green-500 transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Points Balance</p>
                <p className="text-3xl font-bold text-gray-900">{user?.points || 0}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border-l-4 border-blue-500 transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">My Items</p>
                <p className="text-3xl font-bold text-gray-900">{myItems.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border-l-4 border-purple-500 transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Swaps</p>
                <p className="text-3xl font-bold text-gray-900">
                  {swaps.sent.filter(s => s.status === 'pending').length + 
                   swaps.received.filter(s => s.status === 'pending').length}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl">
                <RefreshCw className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border-l-4 border-amber-500 transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Redeemed Items</p>
                <p className="text-3xl font-bold text-gray-900">{redemptions.length}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl">
                <ShoppingBag className="h-8 w-8 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Items */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">My Items</h2>
                <Link 
                  to="/add-item"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Link>
              </div>
            </div>
            <div className="p-6">
              {myItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No items yet. Start by adding your first item!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myItems.slice(0, 5).map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Requests */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Swap Activity</h2>
            </div>
            <div className="p-6">
              {swaps.received.length === 0 && swaps.sent.length === 0 ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No swap activity yet. Start browsing items!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Received Requests */}
                  {swaps.received.slice(0, 3).map((swap) => (
                    <div key={swap._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={swap.item.images[0]} 
                            alt={swap.item.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{swap.item.title}</p>
                            <p className="text-sm text-gray-500">
                              Request from {swap.requester?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(swap.status)}
                          {swap.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSwapResponse(swap._id, 'accepted')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleSwapResponse(swap._id, 'rejected')}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Sent Requests */}
                  {swaps.sent.slice(0, 2).map((swap) => (
                    <div key={swap._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={swap.item.images[0]} 
                            alt={swap.item.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{swap.item.title}</p>
                            <p className="text-sm text-gray-500">
                              Your request to {swap.owner?.name}
                            </p>
                          </div>
                        </div>
                        {getStatusIcon(swap.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Redeemed Items Section */}
        {redemptions.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Redeemed Items</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {redemptions.map((redemption) => (
                  <div key={redemption._id} className="border border-gray-200 rounded-lg p-4">
                    <img 
                      src={redemption.item.images[0]} 
                      alt={redemption.item.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-medium text-gray-900 mb-1">{redemption.item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{redemption.pointsUsed} points used</span>
                      <span>{new Date(redemption.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold text-white">ReWear</span>
              </div>
              <p className="text-gray-400 mb-4">
                Building a sustainable future through community-driven fashion exchange.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/items" className="hover:text-green-500 transition-colors">Browse Items</a></li>
                <li><a href="/add-item" className="hover:text-green-500 transition-colors">List Item</a></li>
                <li><a href="/dashboard" className="hover:text-green-500 transition-colors">Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Sustainability</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ReWear. All rights reserved. Made with 💚 for a sustainable future.</p>
          </div>
        </div>
      </footer>    </div>
  );
};

export default Dashboard;