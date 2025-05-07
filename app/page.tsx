'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Test Automation Platform</h1>
      <p className="text-lg mb-8 text-gray-600">A complete solution for test automation and DevOps integration</p>
      
      <div className="flex space-x-4 justify-center">
        <Link 
          href="/login" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl transition duration-200 border border-gray-300 hover:bg-gray-50"
        >
          Register
        </Link>
      </div>
      
      <div className="mt-12 grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-xl">
          <h3 className="font-medium text-indigo-800">Test Management</h3>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl">
          <h3 className="font-medium text-purple-800">Automation</h3>
        </div>
        <div className="p-4 bg-pink-50 rounded-xl">
          <h3 className="font-medium text-pink-800">CI/CD Integration</h3>
        </div>
        <div className="p-4 bg-blue-50 rounded-xl">
          <h3 className="font-medium text-blue-800">Reporting</h3>
        </div>
      </div>
    </div>
  );
} 