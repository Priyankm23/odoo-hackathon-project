import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, User, MessageCircle, Heart, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Item {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  status: string;
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  pointValue?: number;
  createdAt: string;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [swapMessage, setSwapMessage] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/items/${id}`);
      if (response.ok) {
        const data = await response.json();
        setItem(data);
      } else {
        navigate('/items');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      navigate('/items');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setRequesting(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/swaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          itemId: item?._id,
          message: swapMessage
        })
      });

      if (response.ok) {
        setShowSwapModal(false);
        setSwapMessage('');
        alert('Swap request sent successfully!');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error sending swap request:', error);
      alert('Failed to send swap request');
    } finally {
      setRequesting(false);
    }
  };

  const handlePointRedemption = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const pointsRequired = item?.pointValue || 75;
    if (user.points < pointsRequired) {
      alert('Insufficient points for redemption');
      return;
    }

    if (confirm(`Redeem this item for ${pointsRequired} points?`)) {
      try {
        const response = await fetch('/api/v1/redeem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ itemId: item?._id })
        });

        if (response.ok) {
          alert('Item redeemed successfully!');
          navigate('/dashboard');
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('Error redeeming item:', error);
        alert('Failed to redeem item');
      }
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <button
            onClick={() => navigate('/items')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Back to Items
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user?._id === item.uploadedBy._id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 flex flex-col">
      <div className="flex-grow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/items')}
          className="flex items-center text-green-600 hover:text-green-700 mb-8 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Items</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl border border-green-100">
              <img 
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-3 transition-all transform hover:scale-105 ${
                      selectedImage === index ? 'border-green-600 shadow-lg ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{item.title}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {item.condition} condition
                </span>
                <span className="text-sm text-gray-600">Size {item.size}</span>
                <span className="text-sm text-gray-600 capitalize">{item.category}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            {item.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center">
                <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{item.uploadedBy.name}</p>
                  <p className="text-sm text-gray-600">
                    Listed on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwner && item.status === 'available' && user && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Request Swap
                </button>
                
                <button
                  onClick={handlePointRedemption}
                  className="w-full bg-white border border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Redeem for {item.pointValue || 75} Points
                </button>
              </div>
            )}

            {!user && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Please log in to request swaps or redeem items</p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Login to Continue
                </button>
              </div>
            )}

            {isOwner && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">This is your item</p>
                <p className="text-blue-600 text-sm">You cannot swap or redeem your own items</p>
              </div>
            )}

            {item.status !== 'available' && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800 font-medium">Item not available</p>
                <p className="text-gray-600 text-sm">This item has already been swapped or is pending approval</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-8 w-8 text-green-500" />
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
                <li><a href="/register" className="hover:text-green-500 transition-colors">Join Us</a></li>
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
      </footer>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Swap</h3>
            <p className="text-gray-600 mb-6">
              Send a message to <span className="font-semibold text-green-600">{item.uploadedBy.name}</span> about swapping for "{item.title}"
            </p>
            <textarea
              value={swapMessage}
              onChange={(e) => setSwapMessage(e.target.value)}
              placeholder="Hi! I'm interested in swapping for this item..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-200 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={requesting}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {requesting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;