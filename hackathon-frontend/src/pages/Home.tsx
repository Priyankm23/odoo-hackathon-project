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
      const response = await fetch('http://localhost:5000/api/v1/items?limit=6');
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
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Recycle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Join 10,000+ Sustainable Fashion Enthusiasts</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Swap. Share. Sustain.
              <br />
              <span className="text-green-100">Fashion for a Better Tomorrow</span>
            </h1>
            <p className="text-xl text-green-50 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your wardrobe sustainably. Exchange pre-loved clothing with our community,
              reduce waste, and discover unique pieces—all while earning points for every swap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 hover:shadow-xl transform hover:-translate-y-1 transition-all inline-flex items-center justify-center"
              >
                Start Swapping Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/items" 
                className="bg-green-700/30 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700/50 transition-all inline-flex items-center justify-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Items
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-green-100 text-sm">Items Swapped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-green-100 text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-green-100 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">How It Works</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              Three Simple Steps to Sustainable Fashion
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the circular fashion economy in minutes and start making a positive impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 text-center transform hover:-translate-y-2 border border-green-100">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shirt className="h-8 w-8 text-white" />
              </div>
              <div className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">Step 1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                List Your Items
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload photos and details of clothing items you no longer wear. 
                Our community values quality and sustainable choices.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 text-center transform hover:-translate-y-2 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">Step 2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Connect & Swap
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse items from other members and request swaps. 
                Build connections while exchanging fashion treasures.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 text-center transform hover:-translate-y-2 border border-amber-100">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="bg-amber-100 text-amber-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">Step 3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Earn Rewards
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Our Impact</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              Why Choose Sustainable Fashion?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Together, we're making a real difference for our planet and communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-green-500 group">
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Reduce Waste
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every item swapped prevents textile waste and reduces environmental impact. Join us in keeping fashion circular and protecting our planet.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-green-600 font-semibold">
                  <span className="text-3xl font-bold mr-2">2.5M</span>
                  <span className="text-sm">kg CO₂ saved</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-blue-500 group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Build Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with like-minded individuals who value sustainability, style, and conscious living. Share stories and inspire change.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-blue-600 font-semibold">
                  <span className="text-3xl font-bold mr-2">10K+</span>
                  <span className="text-sm">Active members</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-amber-500 group">
              <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Save Money
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Refresh your wardrobe without spending money on new clothes. Sustainable fashion that's good for your wallet and the planet.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-amber-600 font-semibold">
                  <span className="text-3xl font-bold mr-2">$450</span>
                  <span className="text-sm">Avg. saved/year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shirt className="h-8 w-8 text-green-500" />
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
    </div>
  );
};

export default Home;