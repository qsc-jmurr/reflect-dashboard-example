'use client';

import { useState } from 'react';
import { useReflectData } from '@/hooks/useReflectData';
import { DashboardStats } from '@/components/DashboardStats';
import { CoresList } from '@/components/CoresList';
import { SystemsList } from '@/components/SystemsList';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'cores' | 'systems'>('cores');
  const { cores, systems, loading, error, lastUpdated, refresh } = useReflectData(30000);

  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Example Reflect Dashboard</h1>
              <p className="text-gray-600 mt-1">See all your deployments in a unified dashboard using the API</p>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats cores={cores} systems={systems} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('cores')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cores'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cores ({cores.length})
              </button>
              <button
                onClick={() => setActiveTab('systems')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'systems'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Systems ({systems.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'cores' ? (
              <CoresList cores={cores} loading={loading} error={error} />
            ) : (
              <SystemsList systems={systems} loading={loading} error={error} />
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <div className="inline-flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Auto-refreshing every 30 seconds</span>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            Q-SYS Reflect Dashboard - Built with Next.js and Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}