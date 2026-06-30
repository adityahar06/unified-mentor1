import { useState } from 'react';
import { Star, Filter, MessageSquare } from 'lucide-react';

export default function Discovery() {
  const [activeTab, setActiveTab] = useState('products');

  // Mock data for display
  const products = [
    { id: 1, name: 'Handcrafted Clay Pot', entrepreneur: 'Ramesh Kumar', category: 'Pottery', price: 450, rating: 4.8 },
    { id: 2, name: 'Leather Formal Shoes', entrepreneur: 'Ali Shoemaker', category: 'Cobbler', price: 1200, rating: 4.5 },
    { id: 3, name: 'Custom Cotton Shirt', entrepreneur: 'Meera Tailors', category: 'Tailoring', price: 850, rating: 4.9 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace & Services</h1>
          <p className="text-gray-500 mt-1">Discover local talent and handmade goods.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'products' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Buy Products
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'services' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Book Services
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 mb-4 font-semibold text-gray-900 border-b border-gray-100 pb-4">
              <Filter className="w-5 h-5 text-purple-600" />
              Filters
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {['All', 'Cobbler', 'Potter', 'Tailor', 'Artisan'].map(cat => (
                    <label key={cat} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <input type="range" className="w-full accent-purple-600" />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹0</span>
                  <span>₹5000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                <div className="h-48 bg-gray-200 relative overflow-hidden flex items-center justify-center text-gray-400">
                  {/* Placeholder for image */}
                  No Image Available
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold text-purple-600 mb-1 uppercase tracking-wider">{product.category}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">by {product.entrepreneur}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {product.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Basic DL Demo Box (Mock UI for the backend DL feature) */}
          <div className="mt-12 bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="flex items-center gap-2 font-bold text-purple-900 mb-2">
              <MessageSquare className="w-5 h-5" />
              AI Review Analysis
            </h3>
            <p className="text-sm text-purple-800 mb-4">
              Try our Basic Deep Learning Sentiment Analysis. Enter a review below to see if our model classifies it as Positive or Negative.
            </p>
            <div className="flex gap-2">
              <input type="text" placeholder="e.g. 'Amazing handmade quality!'" className="flex-1 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 px-4 py-2" />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Analyze
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
