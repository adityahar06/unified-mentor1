import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, ShieldCheck, ShieldAlert } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entRes, revRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/entrepreneurs/${id}`),
          axios.get(`http://localhost:5000/api/reviews/${id}`)
        ]);
        setEntrepreneur(entRes.data);
        setReviews(revRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Hardcode a fake token for now to bypass Auth for demo if needed, 
      // or assume JWT is in local storage
      const token = localStorage.getItem('token');
      
      const res = await axios.post(
        'http://localhost:5000/api/reviews',
        { targetId: id, targetModel: 'Entrepreneur', rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setReviews([res.data, ...reviews]);
      setComment('');
      setRating(5);
      setSubmitting(false);
      
      // Refresh entrepreneur to get updated trust rating
      const updatedEnt = await axios.get(`http://localhost:5000/api/entrepreneurs/${id}`);
      setEntrepreneur(updatedEnt.data);
    } catch (err) {
      console.error(err);
      alert('Must be logged in to review (for this demo, login as Customer John)');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;
  if (!entrepreneur) return <div className="text-center mt-20 text-red-500">Entrepreneur not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex flex-shrink-0 items-center justify-center">
          <span className="text-3xl font-bold text-primary">{entrepreneur.userId?.name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{entrepreneur.userId?.name}</h1>
              <p className="text-primary font-semibold uppercase tracking-wide mt-1">{entrepreneur.skillType}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">{entrepreneur.starRating} Avg</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold">{entrepreneur.trustRating} / 5 Trust</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{entrepreneur.bio}</p>
          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            <span>📍 {entrepreneur.userId?.location || 'Local'}</span>
            <span>⏱ {entrepreneur.experience} years exp.</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Trust Ratings</h2>
        
        {/* Review Form */}
        <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Leave a Review</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              placeholder="Share your experience..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {submitting ? 'Analyzing Sentiment...' : 'Submit Review'}
          </button>
        </form>

        {/* Review List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{review.userId?.name || 'Anonymous'}</span>
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                    </div>
                  </div>
                  {review.flagged && (
                    <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                      <ShieldAlert className="w-3 h-3" />
                      FLAGGED (AI)
                    </div>
                  )}
                </div>
                <p className="text-gray-700">{review.comment}</p>
                {review.flagged && (
                  <p className="text-xs text-red-500 mt-2">
                    System Note: The text sentiment contradicts the star rating. Not counted towards Trust Score.
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;
