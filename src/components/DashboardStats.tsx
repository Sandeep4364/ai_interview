import React from 'react';
import { Clock, Users, Target, Award } from 'lucide-react';
import { StatCard } from './visualizations/StatCard';
import { LineChart } from './visualizations/LineChart';
import { CircularProgress } from './visualizations/CircularProgress';
import { useStats } from '../hooks/useStats';

export function DashboardStats() {
  const { stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Stats and Charts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Practice Statistics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Total Sessions"
              value={stats.totalSessions.toString()}
              icon={Target}
              trend="+1 today"
            />
            <StatCard
              title="Practice Time"
              value={`${stats.totalPracticeTime}min`}
              icon={Clock}
              trend="+15min"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Question Categories</h3>
            <div className="space-y-3">
              {Object.entries(stats.questionCategories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ 
                          width: `${(count / stats.totalSessions * 100)}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Score Trends</h3>
            <LineChart data={stats.recentTrends} />
          </div>
        </div>

        {/* Right Column - Performance Metrics */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Average Performance</h3>
            <CircularProgress 
              percentage={Math.round(stats.averageScore)}
              color="text-green-500"
            />
            <p className="text-center mt-4 text-gray-600">
              Based on {stats.totalSessions} practice sessions
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Achievement</h3>
            <div className="flex items-center justify-center">
              <Award className="h-12 w-12 text-yellow-500" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900">
                  {stats.totalSessions > 0 ? 'Practice Milestone' : 'Start Practicing'}
                </p>
                <p className="text-sm text-gray-600">
                  {stats.totalSessions > 0 
                    ? `Completed ${stats.totalSessions} practice sessions` 
                    : 'Complete your first practice session'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}