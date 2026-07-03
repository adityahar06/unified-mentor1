import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in duration-500">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Empowering Local <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Micro-Entrepreneurs</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Connect with trusted local cobblers, potters, tailors, artisans, and small vendors. Book services or buy handmade products directly from your community.
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/directory" className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Browse Directory
        </Link>
        <Link to="/login" className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all">
          Join as Entrepreneur
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl w-full text-left">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="text-secondary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Trust Ratings</h3>
          <p className="text-gray-600">Our machine learning models analyze reviews to flag fake ratings, ensuring you connect with truly reliable professionals.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Grow Your Local Business</h3>
          <p className="text-gray-600">Entrepreneurs get a dedicated dashboard to manage bookings, track earnings, and showcase their gallery to the local community.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
