import { Link, useNavigate } from 'react-router-dom';
import { Store, UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:bg-primary/90 transition-colors">
              <Store className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              MicroMarket
            </span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/directory" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Directory
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="font-medium text-gray-700">Hi, {user.name}</span>
                {user.role === 'entrepreneur' && (
                  <Link to="/dashboard" className="text-sm font-medium text-primary hover:underline">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50">
                <UserCircle className="w-5 h-5" />
                <span>Login / Signup</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
