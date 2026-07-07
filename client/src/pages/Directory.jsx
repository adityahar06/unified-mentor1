import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShieldCheck } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cobbler', label: 'Cobblers' },
  { id: 'potter', label: 'Potters' },
  { id: 'tailor', label: 'Tailors' },
  { id: 'artisan', label: 'Artisans' },
  { id: 'vendor', label: 'Vendors' }
];

const Directory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentCategory = category || 'all';

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        // In a real app, use the actual backend URL from env
        const { data } = await axios.get('http://localhost:5000/api/entrepreneurs');
        setEntrepreneurs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);

  const handleCategoryClick = (catId) => {
    if (catId === 'all') {
      navigate('/directory');
    } else {
      navigate(`/directory/${catId}`);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading entrepreneurs...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  // Filter and auto-sort by trust rank (highest first)
  const filteredAndSorted = entrepreneurs
    .filter((ent) => currentCategory === 'all' || ent.skillType.toLowerCase() === currentCategory.toLowerCase())
    .sort((a, b) => b.trustRating - a.trustRating);

  const pageTitle = currentCategory === 'all' 
    ? 'Local Entrepreneurs' 
    : `List of ${categories.find(c => c.id === currentCategory)?.label || currentCategory}`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 capitalize">{pageTitle}</h2>
        <p className="text-gray-600 mt-2">Find trusted professionals in your area, ranked by community trust.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              currentCategory === cat.id
                ? 'bg-primary text-white shadow-md transform scale-105'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-primary hover:border-indigo-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSorted.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
            No entrepreneurs found in this category yet.
          </div>
        ) : (
          filteredAndSorted.map((ent, index) => (
            <Link key={ent._id} to={`/profile/${ent._id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group block relative overflow-hidden transform hover:-translate-y-1">
              
              {/* Rank Badge */}
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg shadow-sm z-10 flex items-center gap-1">
                Rank #{index + 1}
              </div>

              <div className="flex justify-between items-start mb-4 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{ent.userId?.name}</h3>
                  <p className="text-sm font-medium text-primary uppercase tracking-wide">{ent.skillType}</p>
                </div>
                <div className="bg-gray-50 px-2 py-1 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-1 border border-gray-100 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  {ent.starRating}
                </div>
              </div>
              
              <p className="text-gray-600 line-clamp-2 text-sm mb-4 leading-relaxed">
                {ent.bio}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <span className="text-sm text-gray-500 font-medium">{ent.userId?.location || 'Local'}</span>
                
                <div className="flex items-center gap-1 text-sm font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Trust: {ent.trustRating || 0}/5
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Directory;
