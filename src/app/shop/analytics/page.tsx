'use client';

import { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import AnalyticsLayout from '@/components/AnalyticsLayout';
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

export default function ShopAnalytics() {
  const [timeframe, setTimeframe] = useState('month');

  // Sample data - replace with actual data from your backend
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [4500, 5200, 4800, 5800, 6200, 6800],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const customerData = {
    labels: ['New', 'Returning', 'Loyal'],
    datasets: [{
      data: [30, 45, 25],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
      ],
    }]
  };

  const topProducts = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{
      label: 'Units Sold',
      data: [150, 120, 100, 80, 60],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };

  return (
    <AnalyticsLayout>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Store Analytics</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">Total Sales</h3>
            <p className="text-3xl font-bold text-blue-600">$6,800</p>
            <p className="text-sm text-green-500">↑ 10% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">Orders</h3>
            <p className="text-3xl font-bold text-blue-600">142</p>
            <p className="text-sm text-green-500">↑ 15% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">Avg. Order Value</h3>
            <p className="text-3xl font-bold text-blue-600">$48</p>
            <p className="text-sm text-red-500">↓ 5% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">Customer Base</h3>
            <p className="text-3xl font-bold text-blue-600">89</p>
            <p className="text-sm text-green-500">↑ 8% from last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
            <Line data={salesData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Customer Types</h2>
            <Pie data={customerData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Products</h2>
            <Bar data={topProducts} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {/*
                Replace the following sample data with actual recent orders data
              */}
              {/*
                { id: '#123', customer: 'John Doe', amount: '$85', status: 'Delivered' },
                { id: '#124', customer: 'Jane Smith', amount: '$65', status: 'Processing' },
                { id: '#125', customer: 'Mike Johnson', amount: '$120', status: 'Pending' },
                { id: '#126', customer: 'Sarah Wilson', amount: '$45', status: 'Delivered' },
              */}
            </div>
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
