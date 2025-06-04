'use client';

import { useState } from 'react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalStores: number;
  totalOrders: number;
  platformRevenue: number;
  userGrowth: number[];
  storeGrowth: number[];
}

const mockData: AnalyticsData = {
  totalUsers: 12458,
  activeUsers: 3254,
  newUsersToday: 127,
  totalStores: 543,
  totalOrders: 28976,
  platformRevenue: 289760.50,
  userGrowth: [1200, 1350, 1500, 1800, 2100, 2400, 2800],
  storeGrowth: [100, 150, 200, 280, 350, 450, 543]
};

export default function DeveloperAnalytics() {
  const [timeRange, setTimeRange] = useState('week');
  const [data] = useState<AnalyticsData>(mockData);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-primary mt-2">{data.totalUsers.toLocaleString()}</p>
            <div className="text-sm text-green-600 mt-2">
              +{data.newUsersToday} today
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
            <p className="text-3xl font-bold text-primary mt-2">{data.activeUsers.toLocaleString()}</p>
            <div className="text-sm text-gray-500 mt-2">
              {Math.round((data.activeUsers / data.totalUsers) * 100)}% of total users
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Stores</h3>
            <p className="text-3xl font-bold text-primary mt-2">{data.totalStores.toLocaleString()}</p>
            <div className="text-sm text-gray-500 mt-2">
              Across all categories
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Platform Revenue</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              ${data.platformRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <div className="text-sm text-gray-500 mt-2">
              From {data.totalOrders.toLocaleString()} orders
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">User Growth</h3>
            <div className="h-64 flex items-end space-x-2">
              {data.userGrowth.map((value, index) => (
                <div 
                  key={index}
                  className="bg-primary hover:bg-blue-600 transition-all"
                  style={{ 
                    height: `${(value / Math.max(...data.userGrowth)) * 100}%`,
                    width: '12%'
                  }}
                >
                  <div className="text-xs text-center text-white mt-2 transform -rotate-90">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Store Growth</h3>
            <div className="h-64 flex items-end space-x-2">
              {data.storeGrowth.map((value, index) => (
                <div 
                  key={index}
                  className="bg-blue-400 hover:bg-blue-500 transition-all"
                  style={{ 
                    height: `${(value / Math.max(...data.storeGrowth)) * 100}%`,
                    width: '12%'
                  }}
                >
                  <div className="text-xs text-center text-white mt-2 transform -rotate-90">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>API: Operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Database: Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Server Load: Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
