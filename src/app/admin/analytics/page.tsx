'use client';

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import AnalyticsLayout from '@/components/AnalyticsLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState('month');

  // Sample data - replace with actual data from your backend
  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [250, 280, 310, 290, 320, 350, 300],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const storePerformanceData = {
    labels: ['Store A', 'Store B', 'Store C', 'Store D', 'Store E'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [12000, 9000, 15000, 8000, 11000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };

  return (
    <AnalyticsLayout>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Analytics</h1>
          <div className="flex gap-4 mb-6">
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">Total Revenue</h3>
            <p className="text-3xl font-bold text-blue-600">$55,240</p>
            <p className="text-sm text-green-500">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">Active Stores</h3>
            <p className="text-3xl font-bold text-blue-600">95</p>
            <p className="text-sm text-green-500">↑ 8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">User Engagement</h3>
            <p className="text-3xl font-bold text-blue-600">78%</p>
            <p className="text-sm text-green-500">↑ 5% from last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Activity</h2>
            <Line data={userActivityData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Performing Stores</h2>
            <Bar data={storePerformanceData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">System Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Server Uptime</h3>
                <p className="text-2xl font-bold text-green-600">99.9%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Average Response Time</h3>
                <p className="text-2xl font-bold text-green-600">120ms</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Error Rate</h3>
                <p className="text-2xl font-bold text-green-600">0.1%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Active Sessions</h3>
                <p className="text-2xl font-bold text-green-600">1,234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
