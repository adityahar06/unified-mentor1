import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Package, ClipboardList, Star, PlusCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user, token, API } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState('overview');

  // Product form state (for entrepreneurs)
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category: '' });
  const [productMsg, setProductMsg] = useState('');

  // Service request form state (for customers)
  const [serviceForm, setServiceForm] = useState({ entrepreneurId: '', serviceDetails: '' });
  const [serviceMsg, setServiceMsg] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setProductMsg('');
    try {
      const res = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ ...productForm, entrepreneurId: user.id })
      });
      if (res.ok) {
        setProductMsg('Product added successfully!');
        setProductForm({ name: '', description: '', price: '', category: '' });
      } else {
        setProductMsg('Failed to add product.');
      }
    } catch {
      setProductMsg('Server error. Please try again.');
    }
  };

  const handleServiceRequest = async (e) => {
    e.preventDefault();
    setServiceMsg('');
    try {
      const res = await fetch(`${API}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ ...serviceForm, customerId: user.id })
      });
      if (res.ok) {
        setServiceMsg('Service request sent successfully!');
        setServiceForm({ entrepreneurId: '', serviceDetails: '' });
      } else {
        setServiceMsg('Failed to send request.');
      }
    } catch {
      setServiceMsg('Server error. Please try again.');
    }
  };

  const isEntrepreneur = user?.role === 'entrepreneur';

  const tabs = isEntrepreneur
    ? [
        { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
        { id: 'products', label: 'My Products', icon: <Package className="w-4 h-4" /> },
        { id: 'requests', label: 'Service Requests', icon: <ClipboardList className="w-4 h-4" /> },
      ]
    : [
        { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
        { id: 'request', label: 'Book a Service', icon: <ClipboardList className="w-4 h-4" /> },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-500 mt-1">
          {isEntrepreneur
            ? `Entrepreneur Dashboard • ${user?.skillType || 'Skill not set'}`
            : 'Customer Dashboard • Discover and support local talent'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeSection === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-t border-gray-50">
                <span className="text-gray-500">Role</span>
                <span className="font-medium text-gray-900 capitalize">{user?.role}</span>
              </div>
              {isEntrepreneur && (
                <div className="flex justify-between py-2 border-t border-gray-50">
                  <span className="text-gray-500">Skill Type</span>
                  <span className="font-medium text-gray-900">{user?.skillType || 'Not set'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-3">
              {isEntrepreneur ? <Package className="w-7 h-7 text-emerald-600" /> : <Star className="w-7 h-7 text-emerald-600" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
            <p className="text-gray-500 text-sm">{isEntrepreneur ? 'Products Listed' : 'Orders Placed'}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-3">
              <ClipboardList className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
            <p className="text-gray-500 text-sm">Service Requests</p>
          </div>
        </div>
      )}

      {/* Entrepreneur: Add Product */}
      {activeSection === 'products' && isEntrepreneur && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-purple-600" />
            Add New Product
          </h2>

          {productMsg && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${productMsg.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {productMsg}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="e.g. Handcrafted Clay Pot" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm"
                rows="3" placeholder="Describe your product..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm"
                  placeholder="450" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm bg-white">
                  <option value="">Select</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Cobbler">Cobbler</option>
                  <option value="Tailoring">Tailoring</option>
                  <option value="Artisan">Artisan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md">
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Entrepreneur: View Requests */}
      {activeSection === 'requests' && isEntrepreneur && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Incoming Service Requests</h2>
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Clock className="w-12 h-12 mb-3" />
            <p>No service requests yet.</p>
            <p className="text-sm">Requests from customers will appear here.</p>
          </div>
        </div>
      )}

      {/* Customer: Book a Service */}
      {activeSection === 'request' && !isEntrepreneur && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            Book a Service
          </h2>

          {serviceMsg && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${serviceMsg.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {serviceMsg}
            </div>
          )}

          <form onSubmit={handleServiceRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entrepreneur ID</label>
              <input type="text" required value={serviceForm.entrepreneurId} onChange={e => setServiceForm({...serviceForm, entrepreneurId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Enter entrepreneur's ID" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Details</label>
              <textarea required value={serviceForm.serviceDetails} onChange={e => setServiceForm({...serviceForm, serviceDetails: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm"
                rows="4" placeholder="Describe the service you need..." />
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md">
              Send Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
