import React, { useEffect, useState } from 'react';
import { Check, X, Eye, Users, Package, Clock, TrendingUp } from 'lucide-react';

interface PendingItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  size: string;
  condition: string;
  uploadedBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface AdminStats {
  totalUsers: number;
  totalItems: number;
  pendingItems: number;
  availableItems: number;
  swappedItems: number;
  totalSwaps: number;
  totalRedemptions: number;
}

const AdminPanel: React.FC = () => {
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PendingItem | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [pendingRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/v1/admin/items/pending', {
          credentials: 'include'
        }),
        fetch('http://localhost:5000/api/v1/admin/dashboard', {
          credentials: 'include'
        })
      ]);

      if (pendingRes.ok) {
        const pending = await pendingRes.json();
        setPendingItems(pending);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (itemId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/admin/items/${itemId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pointValue: 75 })
      });

      if (response.ok) {
        fetchAdminData(); // Refresh data
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error approving item:', error);
    }
  };

  const handleReject = async (itemId: string) => {
    if (confirm('Are you sure you want to reject this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/admin/items/${itemId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          fetchAdminData(); // Refresh data
          setSelectedItem(null);
        }
      } catch (error) {
        console.error('Error rejecting item:', error);
      }
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage platform content and monitor activity</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSwaps}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Items */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Items ({pendingItems.length})
            </h2>
          </div>
          
          <div className="p-6">
            {pendingItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No items pending approval</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingItems.map((item) => (
                  <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{item.uploadedBy.name}</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleApprove(item._id)}
                          className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item._id)}
                          className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 flex items-center justify-center"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Item Review</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={selectedItem.images[0]}
                      alt={selectedItem.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedItem.title}</h4>
                      <p className="text-gray-600 mt-2">{selectedItem.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <p className="text-gray-600 capitalize">{selectedItem.category}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Size:</span>
                        <p className="text-gray-600">{selectedItem.size}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Condition:</span>
                        <p className="text-gray-600 capitalize">{selectedItem.condition}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Uploaded by:</span>
                        <p className="text-gray-600">{selectedItem.uploadedBy.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => handleApprove(selectedItem._id)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Item
                  </button>
                  <button
                    onClick={() => handleReject(selectedItem._id)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;