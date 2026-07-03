import { useState } from 'react';
import { Star, ShieldAlert, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Placeholder data
  const stats = [
    { label: 'Total Earnings', value: '$1,250' },
    { label: 'Active Requests', value: '3' },
    { label: 'Avg Star Rating', value: '4.8', icon: Star },
    { label: 'Trust Score', value: '98%', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-2">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl font-bold text-primary">CS</span>
          </div>
          <h3 className="text-center font-bold text-gray-900">Cobbler Sam</h3>
          <p className="text-center text-sm text-gray-500">Downtown • Cobbler</p>
        </div>
        <nav className="flex flex-col space-y-1">
          {['overview', 'requests', 'products', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                  {stat.icon && <stat.icon className={`w-6 h-6 ${stat.icon === Star ? 'text-yellow-400 fill-current' : 'text-green-500'}`} />}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">Customer John</span>
                    <span className="flex text-yellow-400 text-sm">★★★★★</span>
                  </div>
                  <p className="text-gray-700">Terrible job, ruined my shoes and overcharged me.</p>
                </div>
                <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium border border-red-100">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Flagged by AI</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 border-t pt-2">Our sentiment analysis detected a strong negative sentiment (95%) which contradicts the 5-star rating. This review is under administrative review and has been removed from your trust score.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
