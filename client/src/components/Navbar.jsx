import { Link } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                UM
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                Unified Mentor
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/discover" className="border-transparent text-gray-500 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Marketplace
              </Link>
              <Link to="/services" className="border-transparent text-gray-500 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Local Services
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium">
              <UserCircle2 className="w-5 h-5" />
              Sign In
            </Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all hover:shadow-md">
              Join as Mentor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
