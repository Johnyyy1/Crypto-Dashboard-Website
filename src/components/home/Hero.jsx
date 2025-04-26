import { useState, useEffect } from 'react';
import { ChevronRight, Eye, EyeOff, ArrowRight, ArrowUpRight, ChevronDown, Menu } from 'lucide-react';

export default function CreativeCryptoHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(42361);
  const [priceDirection, setPriceDirection] = useState(1);
  const [scrolled, setScrolled] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solanaData, setSolanaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  // Simulate price movement
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 50) * priceDirection;
      setCurrentPrice(prev => prev + change);
      if (Math.random() > 0.7) setPriceDirection(prev => prev * -1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [priceDirection]);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position * 0.05);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      const fetchSolana = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('https://api.coingecko.com/api/v3/coins/solana');
          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          
          const data = await response.json();

          setSolanaData(data);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching crypto data:', err);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchSolana();
    }, []);


  return (
    <div className="bg-white min-h-screen w-full overflow-hidden relative">
      {/* Background grid pattern with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white bg-opacity-70 z-0 w-full" 
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}>
      </div>
      
      {/* Enhanced floating blobs with better positioning - full width usage */}
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-gradient-to-r from-blue-200 to-emerald-100 blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-violet-200 to-blue-100 blur-3xl opacity-20" 
           style={{ transform: `translateY(${scrolled * -1}px)` }}></div>
      <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-gradient-to-r from-yellow-100 to-emerald-100 blur-3xl opacity-20"
           style={{ transform: `translateY(${scrolled}px)` }}></div>
      
      {/* Additional blobs for wider screens with enhanced colors */}
      <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 blur-3xl opacity-25"></div>
      <div className="absolute bottom-1/4 right-10 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 blur-3xl opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-3xl opacity-25"></div>
      
      {/* Hero Section - improved layout and increased max width for 4K */}
      <section className="relative z-10 px-6 lg:px-16 py-8 md:py-24 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[2000px] mx-auto">
          <div className="md:w-1/2 lg:pr-16 order-2 md:order-1 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-gray-900">
              Invest Smarter with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">AI-Powered</span> Insights
            </h1>
            <p className="text-gray-600 text-lg xl:text-xl mb-8 leading-relaxed max-w-3xl">
              Quant combines real-time data, advanced analytics, and machine learning to help you make informed investment decisions in the crypto market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              <button 
                className="group relative bg-black text-white px-7 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>Start Investing</span>
                <ArrowRight size={18} className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </button>
              <button className="group relative bg-gray-100 text-gray-800 px-7 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                <span>Watch Demo</span>
                <div className="ml-2 bg-gray-200 group-hover:bg-gray-300 rounded-full p-1 transition-colors">
                  <Eye size={14} />
                </div>
              </button>
            </div>
            
            <div className="flex items-center space-x-5 mb-8 md:mb-0">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs shadow-sm border-2 border-white text-blue-600 font-medium">JD</div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs shadow-sm border-2 border-white text-emerald-600 font-medium">KS</div>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs shadow-sm border-2 border-white text-amber-600 font-medium">AR</div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs shadow-sm border-2 border-white text-gray-600 font-medium">12k+</div>
              </div>
              <p className="text-sm text-gray-500">Joined by <span className="font-medium text-gray-700">12,000+</span> investors worldwide</p>
            </div>
          </div>
          
          <div className="md:w-1/2 order-1 md:order-2 flex justify-center items-center relative mb-12 md:mb-0">
            {/* Improved dashboard card with better shadows and effects */}
            <div 
              className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 w-full max-w-lg lg:max-w-xl"
              style={{ 
                transform: `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateZ(0) translateY(${scrolled * -0.5}px)`,
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Portfolio Overview</h3>
                  <p className="text-gray-500 text-sm">Updated just now</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <button 
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setHideBalance(!hideBalance)}
                  >
                    {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Total Balance</p>
                  <div className="flex items-center bg-emerald-50 text-emerald-600 text-xs px-2 py-1 rounded">
                    <ArrowUpRight size={12} className="mr-1" />
                    <span>+5.3%</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold">
                  {hideBalance ? '•••••••' : '$184,239.85'}
                </h2>
              </div>
              
              <div className="border-t border-gray-100 pt-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-full p-2 mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Bitcoin</p>
                      <p className="text-xs text-gray-500">BTC</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${currentPrice.toLocaleString()}</p>
                    <p className={`text-xs ${priceDirection > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {priceDirection > 0 ? '+' : ''}{(priceDirection * 1.4).toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                {/* Enhanced mini chart */}
                <div className="h-14 w-full overflow-hidden relative">
                  <svg viewBox="0 0 100 20" className="w-full h-full">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,10 Q10,8 20,9 T40,7 T60,12 T80,9 T100,11"
                      fill="none"
                      stroke="#e0f2fe"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,10 Q10,8 20,9 T40,7 T60,12 T80,9 T100,11"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      strokeDasharray="100"
                      strokeDashoffset={scrolled}
                    />
                    <path
                      d="M0,10 Q10,8 20,9 T40,7 T60,12 T80,9 T100,11 V20 H0 Z"
                      fill="url(#gradient)"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-4 py-2 rounded-lg flex-1 hover:shadow-md transition-all">Buy</button>
                <button className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg flex-1 hover:bg-gray-200 transition-colors">Sell</button>
              </div>
              
              {/* Enhanced floating notification */}
              <div className="absolute -top-4 -right-4 bg-white py-2 px-3 rounded-lg shadow-lg border border-gray-100 text-xs flex items-center animate-pulse">
                <div className="bg-emerald-500 h-2 w-2 rounded-full mr-2"></div>
                BTC up 5.3% today
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -z-10 -bottom-8 -right-8 h-44 w-44 rounded-full bg-blue-50 border border-blue-100"></div>
            <div className="absolute -z-10 top-1/4 -left-8 h-32 w-32 rounded-full bg-emerald-50 border border-emerald-100"></div>
            
            {/* Additional decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/4 h-16 w-16 rounded-full bg-amber-50 border border-amber-100"></div>
          </div>
        </div>
      </section>

      {/* Enhanced AI Insights Preview - full width approach */}
      <section className="relative z-10 pb-12 md:pb-24 w-full">
        <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-md w-full md:w-auto md:flex-1 max-w-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17V17.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.09009 9.00001C9.32519 8.33167 9.78924 7.76811 10.4 7.40914C11.0108 7.05016 11.729 6.91894 12.4273 7.03871C13.1255 7.15849 13.7589 7.52153 14.2152 8.06353C14.6714 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">AI Market Insight</p>
                <p className="text-sm text-gray-600">Based on current trends, consider diversifying into Ethereum</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-md w-full md:w-auto md:flex-1 max-w-xl hover:shadow-lg transition-all">
              <div className="bg-emerald-100 rounded-lg p-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Portfolio Analysis</p>
                <p className="text-sm text-gray-600">Your portfolio has outperformed the market by 12% this month</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-md w-full md:w-auto md:flex-1 max-w-xl hover:shadow-lg transition-all">
              <div className="bg-amber-100 rounded-lg p-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Market Alert</p>
                <p className="text-sm text-gray-600">Solana (SOL) has {solanaData.market_data?.price_change_percentage_24h >= 0 ? 'increased' : 'decreased'} by {Math.abs(solanaData.market_data?.price_change_percentage_24h.toFixed(2))}% in the last 24 hours</p>
                </div>
            </div>
          </div>
        </div>
      </section>
      <div>
      </div>
    </div>
  );
}