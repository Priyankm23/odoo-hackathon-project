import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shirt, User, LogOut, Plus, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">ReWear</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-1">
              <Link 
                to="/items" 
                className="text-gray-700 hover:text-green-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-green-50"
              >
                Browse Items
              </Link>
              {user && (
                <Link 
                  to="/add-item" 
                  className="text-gray-700 hover:text-green-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-green-50"
                >
                  List Item
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-xl shadow-lg">
                  <span className="text-sm font-bold text-white">
                    {user.points} points
                  </span>
                </div>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-green-50"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:block">Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-green-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:block">Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-green-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-green-50"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;