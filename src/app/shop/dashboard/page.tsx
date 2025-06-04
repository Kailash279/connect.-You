'use client';

import { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
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

export default function ShopDashboard() {
  const [dateRange, setDateRange] = useState('week');

  // Sample data - replace with actual data from your backend
  const orderData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Orders',
      data: [12, 19, 15, 25, 22, 30, 28],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const productData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{
      label: 'Sales by Product',
      data: [300, 250, 200, 150, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    }]
  };

  const locationData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [{
      label: 'Orders by Location',
      data: [65, 59, 80, 81, 56],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shop Dashboard</h1>
        <div className="flex gap-4 mb-6">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Trends</h2>
          <Line data={orderData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <Pie data={productData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Orders by Location</h2>
          <Bar data={locationData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-600">151</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Revenue</h3>
              <p className="text-2xl font-bold text-green-600">$12,345</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Products</h3>
              <p className="text-2xl font-bold text-purple-600">25</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800">Customers</h3>
              <p className="text-2xl font-bold text-yellow-600">89</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
