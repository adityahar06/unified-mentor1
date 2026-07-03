import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ShieldCheck } from 'lucide-react';

const Directory = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading entrepreneurs...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Local Entrepreneurs</h2>
        <p className="text-gray-600 mt-2">Find trusted professionals in your area.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map((ent) => (
          <Link key={ent._id} to={`/profile/${ent._id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group block">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{ent.userId?.name}</h3>
                <p className="text-sm font-medium text-primary uppercase tracking-wide">{ent.skillType}</p>
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-1 border border-gray-100">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {ent.starRating}
              </div>
            </div>
            
            <p className="text-gray-600 line-clamp-2 text-sm mb-4">
              {ent.bio}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="text-sm text-gray-500">{ent.userId?.location || 'Local'}</span>
              
              <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                Trust: {ent.trustRating || 0}/5
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Directory;
