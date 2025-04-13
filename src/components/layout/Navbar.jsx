import { useState, useEffect } from 'react';
import { TrendingUp, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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

  return (
    <nav className={`sticky top-0 z-50 py-4 px-6 lg:px-16 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/70 backdrop-blur-sm'
    }`}>
      <div className="flex items-center justify-between mx-auto w-full max-w-[2000px]">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 rounded-lg p-2 shadow-md">
            <TrendingUp className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">Quant</span>
        </div>
        
        {/* Desktop Menu - All to the right */}
        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-black font-medium transition-colors group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Invest
                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full mt-2 py-2 bg-white rounded-lg shadow-lg border border-gray-100 w-48 transition-all">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cryptocurrencies</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Coming soon.</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Coming soon.</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Coming soon.</a>
                </div>
              )}
            </div>
            
            <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
              Markets
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
              News
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              Sign In
            </a>
            <button className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.03] relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
      
      {/* Mobile Menu */}
      <div className={`lg:hidden absolute left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-96 border-b border-gray-100' : 'max-h-0'
      }`}>
        <div className="px-6 py-4 space-y-3">
          <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium">Dashboard</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium">Invest</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium">Markets</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium">News</a>
          <div className="pt-2 border-t border-gray-100">
            <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium">Sign In</a>
            <button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-2 rounded-full font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}