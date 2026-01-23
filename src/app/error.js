'use client';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
        <div className="card-body text-center">
          <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
          <h2 className="card-title justify-center text-2xl">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. Please try refreshing the page or check back later.
          </p>
          <div className="card-actions justify-center gap-2">
            <button 
              onClick={reset}
              className="btn btn-primary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn btn-outline"
            >
              Go Home
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {error?.message || 'Unknown error'}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}