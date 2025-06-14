import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
        <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}