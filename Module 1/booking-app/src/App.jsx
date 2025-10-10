import React, { createContext, useContext, useState } from 'react';
import { User, Calendar, LayoutDashboard, LogIn, LogOut, Menu, X, BookOpen } from 'lucide-react';

// Auth Context for state management
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Router Context
const RouterContext = createContext();

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within Router');
  }
  return context;
};

// Navbar Component
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { navigate, currentPath } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/catalog', label: 'Catalog', icon: Calendar },
    { path: '/booking', label: 'My Bookings', icon: Calendar, requireAuth: true },
    { path: '/admin', label: 'Admin', icon: LayoutDashboard, requireAuth: true, adminOnly: true },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="text-2xl font-bold hover:text-blue-100 transition"
            >
              BookingApp
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.requireAuth && !isAuthenticated) return null;
              if (item.adminOnly && user?.role !== 'admin') return null;
              
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center px-4 py-2 rounded-md transition ${
                    currentPath === item.path
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-500'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}

            {isAuthenticated ? (
              <div className="flex items-center ml-4">
                <span className="mr-4 text-blue-100">
                  <User className="w-4 h-4 inline mr-1" />
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition ml-4"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => {
              if (item.requireAuth && !isAuthenticated) return null;
              if (item.adminOnly && user?.role !== 'admin') return null;
              
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition mb-1 ${
                    currentPath === item.path
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-500'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition mt-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="w-full flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition mt-2"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// Login Page
const LoginPage = () => {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      login({ email, name: email.split('@')[0], role: email.includes('admin') ? 'admin' : 'user' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Please login to your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-xs text-gray-600">
            <strong>Demo:</strong> Use any email (e.g., admin@test.com for admin access)
          </p>
        </div>
      </div>
    </div>
  );
};

// Register Page
const RegisterPage = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert('Registration successful! Please login.');
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us today</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Home Page
const HomePage = () => {
  const { navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to BookingApp
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your complete booking management solution
          </p>
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition text-lg"
            >
              Get Started
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Calendar className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Browse and book from our extensive catalog of resources with just a few clicks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <User className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600">
              Secure authentication and personalized booking history for every user.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <LayoutDashboard className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">
              Comprehensive admin tools to manage bookings, users, and resources efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Catalog Page
const CatalogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Resource Catalog</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-lg">
            This is the catalog page where users can browse available resources for booking.
            Backend integration will be added in the next module.
          </p>
        </div>
      </div>
    </div>
  );
};

// Booking Page
const BookingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-lg mb-4">
            Welcome, {user?.name}! This page will display all your bookings.
          </p>
          <p className="text-gray-500">
            Backend integration coming in the next module.
          </p>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Resources</h3>
            <p className="text-gray-600">
              Add, edit, and remove resources from the catalog.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Users</h3>
            <p className="text-gray-600">
              View and manage user accounts and permissions.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Overview</h3>
            <p className="text-gray-600">
              View all bookings and their status across the platform.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics</h3>
            <p className="text-gray-600">
              Track usage statistics and generate reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/catalog':
        return <CatalogPage />;
      case '/booking':
        return isAuthenticated ? <BookingPage /> : <LoginPage />;
      case '/admin':
        return isAuthenticated ? <AdminDashboard /> : <LoginPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {renderPage()}
    </div>
  );
};

// Root Component with Providers
export default function Root() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}