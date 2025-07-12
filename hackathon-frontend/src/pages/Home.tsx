import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Award, Search, Plus, Shirt } from 'lucide-react';
import ItemCard from '../components/ItemCard';

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
    name: string;
  };
  pointValue?: number;
  createdAt: string;
}

const Home: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  const fetchFeaturedItems = async () => {
    try {
      const response = await fetch('/api/v1/items?limit=6');
      if (response.ok) {
        const items = await response.json();
        setFeaturedItems(items.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching featured items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Sustainable Fashion Through{' '}
              <span className="text-green-600">Community Exchange</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the ReWear community to exchange pre-loved clothing, reduce textile waste, 
              and discover unique pieces while earning points for every swap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
              >
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/items" 
                className="border border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Items
              </Link>
              <Link 
                to="/add-item" 
                className="bg-white text-green-600 border border-green-200 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center shadow-sm"
              >
                <Plus className="mr-2 h-5 w-5" />
                List an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to join the sustainable fashion revolution
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                List Your Items
              </h3>
              <p className="text-gray-600">
                Upload photos and details of clothing items you no longer wear. 
                Our community values quality and sustainable choices.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Connect & Swap
              </h3>
              <p className="text-gray-600">
                Browse items from other members and request swaps. 
                Build connections while exchanging fashion treasures.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Earn Points
              </h3>
              <p className="text-gray-600">
                Gain points for successful swaps and use them to redeem items 
                when direct exchanges aren't possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-lg text-gray-600">
              Discover amazing pieces from our community
            </p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/items" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
            >
              View All Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Join the Sustainable Fashion Movement
            </h2>
            <p className="text-xl text-green-100">
              Together, we're making a difference for our planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Reduce Waste
              </h3>
              <p className="text-green-100">
                Every item swapped prevents textile waste and reduces environmental impact
              </p>
            </div>
            
            <div className="p-6">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Build Community
              </h3>
              <p className="text-green-100">
                Connect with like-minded individuals who value sustainability and style
              </p>
            </div>
            
            <div className="p-6">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Save Money
              </h3>
              <p className="text-green-100">
                Refresh your wardrobe without spending money on new clothes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;