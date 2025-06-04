'use client';

import { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'delivered' | 'cancelled';
  distance: string;
  date: string;
}

interface ShopAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: { name: string; sales: number }[];
  recentOrders: Order[];
  customerLocations: { area: string; orders: number }[];
  dailyOrders: number[];
}

const mockData: ShopAnalytics = {
  totalOrders: 856,
  totalRevenue: 25680.45,
  averageOrderValue: 30.00,
  topProducts: [
    { name: 'Fresh Vegetables Bundle', sales: 124 },
    { name: 'Organic Fruit Box', sales: 98 },
    { name: 'Local Farm Eggs', sales: 76 },
    { name: 'Whole Grain Bread', sales: 65 },
    { name: 'Organic Milk', sales: 54 }
  ],
  recentOrders: [
    {
      id: 'ORD001',
      customerName: 'John Smith',
      items: ['Vegetables Bundle', 'Organic Milk'],
      total: 45.99,
      status: 'delivered',
      distance: '2.5 km',
      date: '2025-06-04 14:30'
    },
    {
      id: 'ORD002',
      customerName: 'Emma Wilson',
      items: ['Fruit Box', 'Bread'],
      total: 32.50,
      status: 'pending',
      distance: '1.8 km',
      date: '2025-06-04 15:15'
    },
    {
      id: 'ORD003',
      customerName: 'Michael Brown',
      items: ['Eggs', 'Milk', 'Bread'],
      total: 28.75,
      status: 'pending',
      distance: '3.2 km',
      date: '2025-06-04 15:45'
    }
  ],
  customerLocations: [
    { area: 'Downtown', orders: 245 },
    { area: 'Suburbs North', orders: 189 },
    { area: 'Suburbs South', orders: 167 },
    { area: 'West End', orders: 145 },
    { area: 'East Side', orders: 110 }
  ],
  dailyOrders: [32, 28, 35, 42, 38, 41, 45]
};

export default function ShopOwnerAnalytics() {
  const [data] = useState<ShopAnalytics>(mockData);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop Analytics Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
            <p className="text-3xl font-bold text-primary mt-2">{data.totalOrders}</p>
            <div className="text-sm text-gray-500 mt-2">Last 30 days</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              ${data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Avg. ${data.averageOrderValue} per order
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Daily Orders</h3>
            <div className="h-16 flex items-end space-x-1 mt-2">
              {data.dailyOrders.map((orders, index) => (
                <div
                  key={index}
                  className="bg-primary hover:bg-blue-600 transition-all"
                  style={{
                    height: `${(orders / Math.max(...data.dailyOrders)) * 100}%`,
                    width: '12%'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Products and Customer Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Top Products</h3>
            <div className="space-y-4">
              {data.topProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{product.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 px-2 py-1 rounded text-sm">
                      {product.sales} sales
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Locations</h3>
            <div className="space-y-4">
              {data.customerLocations.map((location, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{location.area}</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 px-2 py-1 rounded text-sm">
                      {location.orders} orders
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Customer</th>
                  <th className="text-left py-2">Items</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Distance</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{order.customerName}</td>
                    <td className="py-2">{order.items.join(', ')}</td>
                    <td className="py-2">${order.total.toFixed(2)}</td>
                    <td className="py-2">{order.distance}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
