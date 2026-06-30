import { Link } from 'react-router-dom';
import { Search, MapPin, Hammer, Scissors, Wrench, Palette } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Cobblers', icon: <Hammer className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600' },
    { name: 'Tailors', icon: <Scissors className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600' },
    { name: 'Potters', icon: <Palette className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
    { name: 'Artisans', icon: <Wrench className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Local Skills</span> <br/>
            in the Digital Age
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mb-10">
            Connect directly with micro-entrepreneurs in your community. Book local services, buy handmade products, and support traditional artisans without middlemen.
          </p>
          
          <div className="w-full max-w-3xl bg-white p-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
            <div className="flex-1 flex items-center pl-4 text-gray-400">
              <Search className="w-5 h-5 mr-2" />
              <input type="text" placeholder="What service are you looking for?" className="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400" />
            </div>
            <div className="hidden sm:flex flex-1 items-center pl-4 border-l border-gray-200 text-gray-400">
              <MapPin className="w-5 h-5 mr-2" />
              <input type="text" placeholder="Your Location" className="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400" />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Categories</h2>
          <p className="text-gray-500 mb-10">Find skilled mentors and micro-entrepreneurs near you.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link to={`/discover?category=${cat.name}`} key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
