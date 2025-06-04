'use client';

import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AppAnalytics() {
  const [timeframe, setTimeframe] = useState('month');

  // Sample data - replace with actual data from your backend
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Shop Owners',
        data: [20, 35, 45, 60, 85, 95],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Customers',
        data: [100, 180, 250, 380, 450, 520],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const storeTypeData = {
    labels: ['Grocery', 'Books', 'Electronics', 'Fashion', 'Others'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    }]
  };

  const regionData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [{
      label: 'Stores by Region',
      data: [120, 98, 140, 108, 87],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Platform Analytics</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">615</p>
          <p className="text-sm text-blue-500">↑ 12% from last month</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Active Stores</h3>
          <p className="text-3xl font-bold text-green-600">95</p>
          <p className="text-sm text-green-500">↑ 8% from last month</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-purple-800">Total Orders</h3>
          <p className="text-3xl font-bold text-purple-600">2,847</p>
          <p className="text-sm text-purple-500">↑ 15% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <Line data={userGrowthData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Store Types Distribution</h2>
          <Doughnut data={storeTypeData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Regional Distribution</h2>
          <Bar data={regionData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Average Orders/Store</span>
              <span className="font-bold">30</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Customer Retention Rate</span>
              <span className="font-bold">78%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Store Activation Rate</span>
              <span className="font-bold">92%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Platform Growth Rate</span>
              <span className="font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
