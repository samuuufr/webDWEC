'use client';
import { Search, RefreshCw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white">404</h1>
          <div className="flex items-center justify-center gap-2 text-white text-xl">
            <Search className="w-8 h-8" />
            <span>Page Not Found</span>
          </div>
        </div>
        <p className="text-gray-300 mb-8 max-w-md">
          The cryptocurrency page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/" className="btn btn-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Go Home
          </a>
          <a href="/dashboard" className="btn btn-outline">
            Dashboard
          </a>
          <a href="/portfolio" className="btn btn-outline">
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}