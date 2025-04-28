import { useState, useEffect } from 'react';
import { TrendingUp, Menu, X, ChevronDown, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onSignInClick, onSignUpClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [cryptoIds, setCryptoIds] = useState([]);
  
  const navigate = useNavigate();

  // Fetch coin ids from API
  async function getCoinIds() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
      const data = await response.json();
      return data.map(coin => coin.id);
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
      return [];
    }
  }

  // Set coin ids after fetching
  useEffect(() => {
    async function setupAutocomplete() {
      const ids = await getCoinIds();
      setCryptoIds(ids);
    }

    setupAutocomplete();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 py-4 px-6 lg:px-16 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/70 backdrop-blur-sm'}`}>
      <div className="flex items-center justify-between mx-auto w-full max-w-[2000px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 rounded-lg p-2 shadow-md">
            <TrendingUp className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">Quant</span>
        </Link>

              {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Search Bar with Autocomplete */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search coins..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 text-sm transition-all"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* Suggestions */}
            {searchValue && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto text-sm">
                {cryptoIds
                  .filter((id) => id.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((id) => (
                    <li key={id} className="py-2 px-4 hover:bg-blue-100 cursor-pointer" onClick={() => {
                      setSearchValue(id);}}>
                      {id}
                    </li>
                  ))}
              </ul>
            )}
          </form>

          {/* Other menu items */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
              Dashboard
            </Link>
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-black font-medium transition-colors group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Invest
                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full mt-2 py-2 bg-white rounded-lg shadow-lg border border-gray-100 w-48 transition-all">
                  <Link to="/invest/crypto" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cryptocurrencies</Link>
                  <Link to="/invest/coming-soon" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Coming soon.</Link>
                </div>
              )}
            </div>
            
            <Link to="/markets" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
              Markets
            </Link>
            
            <Link to="/news" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
              News
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onSignInClick}
              className="text-gray-700 hover:text-black font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
            >
              Sign In
            </button>
            <button 
              onClick={onSignUpClick}
              className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.03] relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
