import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LogOut,
  User,
  BarChart3,
  Users,
  TrendingUp,
  Activity,
  Clock,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';

interface Stats {
  total: number;
  active: number;
  expired: number;
  cancelled: number;
  revenue: number;
  upcomingRenewals: number;
  byCategory: { _id: string; count: number }[];
  byFrequency: { _id: string; count: number }[];
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/data/analysis', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else {
        setError('Failed to fetch analytics');
      }
    } catch (err) {
      console.error(err);
      setError('Server error while fetching analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-gray-600">
              Here’s an overview of subscription analytics.
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users className="text-blue-600" />} label="Total Subscriptions" value={stats?.total} />
            <StatCard icon={<BadgeCheck className="text-green-600" />} label="Active Subscriptions" value={stats?.active} />
            <StatCard icon={<AlertCircle className="text-red-500" />} label="Expired Subscriptions" value={stats?.expired} />
            <StatCard icon={<TrendingUp className="text-purple-600" />} label="Revenue (INR)" value={stats?.revenue} />
            <StatCard icon={<Clock className="text-orange-500" />} label="Upcoming Renewals (7d)" value={stats?.upcomingRenewals} />
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Subscriptions by Category</h3>
            {stats?.byCategory?.length > 0 ? (
              <ul className="space-y-2">
                {stats.byCategory.map((cat) => (
                  <li key={cat._id} className="text-sm text-gray-700">
                    {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)} – {cat.count}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No data.</p>
            )}
          </div>

          {/* Frequency Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Subscriptions by Frequency</h3>
            {stats?.byFrequency?.length > 0 ? (
              <ul className="space-y-2">
                {stats.byFrequency.map((freq) => (
                  <li key={freq._id} className="text-sm text-gray-700">
                    {freq._id.toUpperCase()} – {freq.count}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No data.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string | undefined }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
    <div className="w-10 h-10 mr-4 rounded-full bg-gray-100 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold text-gray-900">{value ?? '-'}</div>
    </div>
  </div>
);

export default Dashboard;
