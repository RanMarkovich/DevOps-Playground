'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Test Automation Platform</h1>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to your Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-800 mb-2">Test Management</h3>
            <p className="text-gray-600">Create, organize and manage your test cases and test suites.</p>
            <button className="mt-4 text-indigo-600 font-medium hover:underline">Get Started →</button>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Automation Scripts</h3>
            <p className="text-gray-600">Generate and maintain your automation scripts with AI assistance.</p>
            <button className="mt-4 text-purple-600 font-medium hover:underline">Create Script →</button>
          </div>
          
          <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
            <h3 className="text-lg font-medium text-pink-800 mb-2">CI/CD Integration</h3>
            <p className="text-gray-600">Integrate your tests with CI/CD pipelines for continuous testing.</p>
            <button className="mt-4 text-pink-600 font-medium hover:underline">Connect Pipeline →</button>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Test Reporting</h3>
            <p className="text-gray-600">Get comprehensive reports and insights from your test runs.</p>
            <button className="mt-4 text-blue-600 font-medium hover:underline">View Reports →</button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Recent Activity</h3>
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
} 