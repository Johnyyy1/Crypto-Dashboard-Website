import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown, 
  Menu,
  Bell,
  BarChart3,
  PieChart,
  Wallet,
  Settings,
  Sparkles,
  ArrowDownRight,
  Clock,
  Search,
  Filter,
  ChevronLeft
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function CryptoDashboard() {
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrolled, setScrolled] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  
  // Crypto data states
  const [portfolioValue, setPortfolioValue] = useState(184239.85);
  const [portfolioChange, setPortfolioChange] = useState(5.9);
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  
  // Simulated historical data
  const portfolioHistory = [
    { date: 'Apr 23', value: 175340 },
    { date: 'Apr 24', value: 178650 },
    { date: 'Apr 25', value: 177890 },
    { date: 'Apr 26', value: 179230 },
    { date: 'Apr 27', value: 181020 },
    { date: 'Apr 28', value: 182950 },
    { date: 'Apr 29', value: 184239 },
  ];
  
  // Asset allocation data for pie chart
  const assetAllocation = [
    { name: 'Bitcoin', value: 45, color: '#F7931A' },
    { name: 'Ethereum', value: 30, color: '#627EEA' },
    { name: 'Solana', value: 15, color: '#00FFA3' },
    { name: 'Other', value: 10, color: '#8884d8' },
  ];
  
  // Crypto price data
  useEffect(() => {
    const cryptoList = [
      { 
        id: 'bitcoin', 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        price: 61240.50, 
        change: 4.2, 
        amount: 1.52,
        value: 93065.56,
        color: '#F7931A',
        bgColor: '#FFF7E6'
      },
      { 
        id: 'ethereum', 
        name: 'Ethereum', 
        symbol: 'ETH', 
        price: 3105.75, 
        change: 6.8, 
        amount: 17.85,
        value: 55437.64,
        color: '#627EEA',
        bgColor: '#EEF2FF'
      },
      { 
        id: 'solana', 
        name: 'Solana', 
        symbol: 'SOL', 
        price: 167.32, 
        change: -2.3, 
        amount: 165.23,
        value: 27647.29,
        color: '#00FFA3',
        bgColor: '#F0FFF4'
      },
      { 
        id: 'cardano', 
        name: 'Cardano', 
        symbol: 'ADA', 
        price: 0.57, 
        change: 1.4, 
        amount: 14052.36,
        value: 8089.36,
        color: '#0033AD',
        bgColor: '#E6F0FF'
      },
    ];
    
    setCryptoData(cryptoList);
    setIsLoading(false);
  }, []);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position * 0.05);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Market insights data
  const marketInsights = [
    {
      title: "BTC Trend Analysis",
      description: "Bitcoin showing strong support at $60K. AI suggests 70% probability of upward movement.",
      type: "positive",
      time: "2h ago"
    },
    {
      title: "Ethereum Update",
      description: "ETH gas fees decreasing by 15% after recent network upgrade.",
      type: "neutral",
      time: "4h ago"
    },
    {
      title: "Market Alert",
      description: "Solana experiencing higher than normal volatility. Consider adjusting your position.",
      type: "warning",
      time: "6h ago"
    }
  ];

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white bg-opacity-70 z-0 w-full" 
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}>
      </div>
      
      {/* Floating blobs */}
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-gradient-to-r from-blue-200 to-emerald-100 blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-violet-200 to-blue-100 blur-3xl opacity-20" 
           style={{ transform: `translateY(${scrolled * -1}px)` }}></div>
      <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-gradient-to-r from-yellow-100 to-emerald-100 blur-3xl opacity-20"
           style={{ transform: `translateY(${scrolled}px)` }}></div>
      <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 blur-3xl opacity-25"></div>
      
      {/* Dashboard Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-6 shadow-sm">
          <div className="flex items-center mb-8">
            <div className="bg-black rounded-lg p-2 mr-2">
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Quant</h1>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-gray-100 text-black font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 size={18} className="mr-3" />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'portfolio' ? 'bg-gray-100 text-black font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('portfolio')}
                >
                  <PieChart size={18} className="mr-3" />
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'wallet' ? 'bg-gray-100 text-black font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('wallet')}
                >
                  <Wallet size={18} className="mr-3" />
                  Wallet
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-gray-100 text-black font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Sparkles size={16} className="text-blue-500 mr-2" />
                <p className="font-medium text-blue-700">AI Assistant</p>
              </div>
              <p className="text-sm text-blue-600 mb-3">Get personalized investment recommendations</p>
              <button className="bg-blue-500 text-white text-sm w-full py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Activate
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <button className="md:hidden mr-4 p-2 rounded-lg bg-gray-100">
                <Menu size={20} />
              </button>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
          
          {/* Notification Banner */}
          {showNotification && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl mb-6 flex justify-between items-center">
              <div className="flex items-center">
                <Sparkles size={20} className="mr-3" />
                <p>New AI-powered trading signals available. Analyze market sentiment in real-time.</p>
              </div>
              <button 
                className="p-1 rounded-full hover:bg-blue-400 transition-colors"
                onClick={() => setShowNotification(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
          
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Portfolio Value</h2>
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
                    <span>+{portfolioChange}%</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold">
                  {hideBalance ? '•••••••' : `$${portfolioValue.toLocaleString()}`}
                </h2>
              </div>
              
              <div className="flex gap-4 mb-4">
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${selectedTimeframe === '1D' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setSelectedTimeframe('1D')}
                >
                  1D
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${selectedTimeframe === '1W' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setSelectedTimeframe('1W')}
                >
                  1W
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${selectedTimeframe === '1M' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setSelectedTimeframe('1M')}
                >
                  1M
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${selectedTimeframe === '1Y' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setSelectedTimeframe('1Y')}
                >
                  1Y
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${selectedTimeframe === 'ALL' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setSelectedTimeframe('ALL')}
                >
                  ALL
                </button>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioHistory}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                      labelFormatter={(label) => `Date: ${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fill="url(#colorValue)" 
                      activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Asset Allocation</h2>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Filter size={16} />
                </button>
              </div>
              
              <div className="flex flex-col items-center justify-center h-64">
                <div className="relative h-40 w-40 mb-4">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F0F0F0" strokeWidth="20" />
                    
                    {/* Bitcoin slice */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#F7931A" 
                      strokeWidth="20"
                      strokeDasharray={`${45 * 2.51} ${100 * 2.51}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Ethereum slice */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#627EEA" 
                      strokeWidth="20"
                      strokeDasharray={`${30 * 2.51} ${100 * 2.51}`}
                      strokeDashoffset={`${-(45 * 2.51)}`}
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Solana slice */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#00FFA3" 
                      strokeWidth="20"
                      strokeDasharray={`${15 * 2.51} ${100 * 2.51}`}
                      strokeDashoffset={`${-(75 * 2.51)}`}
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Other slice */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#8884d8" 
                      strokeWidth="20"
                      strokeDasharray={`${10 * 2.51} ${100 * 2.51}`}
                      strokeDashoffset={`${-(90 * 2.51)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  {assetAllocation.map((asset, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                      <div className="flex-1 text-sm">
                        <span className="font-medium">{asset.name}</span>
                        <span className="text-gray-500 ml-1">{asset.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Crypto Assets */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Your Assets</h2>
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden pl-3">
                  <Search size={16} className="text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    className="bg-transparent border-none py-2 px-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 text-left text-gray-500 font-medium text-sm">Asset</th>
                    <th className="py-3 text-right text-gray-500 font-medium text-sm">Price</th>
                    <th className="py-3 text-right text-gray-500 font-medium text-sm">24h</th>
                    <th className="py-3 text-right text-gray-500 font-medium text-sm">Holdings</th>
                    <th className="py-3 text-right text-gray-500 font-medium text-sm">Value</th>
                    <th className="py-3 text-right text-gray-500 font-medium text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.map((crypto, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: crypto.bgColor }}>
                            <div className="h-6 w-6 rounded-full" style={{ backgroundColor: crypto.color }}></div>
                          </div>
                          <div>
                            <p className="font-medium">{crypto.name}</p>
                            <p className="text-xs text-gray-500">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right font-medium">${crypto.price.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className={`flex items-center justify-end ${crypto.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {crypto.change >= 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                          {Math.abs(crypto.change)}%
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <p className="font-medium">{crypto.amount.toLocaleString()} {crypto.symbol}</p>
                      </td>
                      <td className="py-4 text-right font-medium">${crypto.value.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-lg transition-colors">
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Market Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Market Insights</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className={`h-8 w-8 rounded-full mr-4 flex items-center justify-center flex-shrink-0
                      ${insight.type === 'positive' ? 'bg-emerald-100 text-emerald-600' : 
                       insight.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                       'bg-blue-100 text-blue-600'}`}
                    >
                      {insight.type === 'positive' ? 
                        <ArrowUpRight size={16} /> : 
                        insight.type === 'warning' ? 
                        <Bell size={16} /> : 
                        <BarChart3 size={16} />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{insight.title}</h3>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {insight.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center mb-6">
                <Sparkles size={20} className="mr-2" />
                <h2 className="text-lg font-bold">AI Assistant</h2>
              </div>
              
              <p className="mb-6 text-blue-100">Based on your portfolio performance and market conditions, we've generated personalized recommendations.</p>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <p className="text-sm font-medium mb-2">Portfolio Rebalancing</p>
                <p className="text-xs">Consider increasing your Ethereum allocation by 5% to optimize risk-adjusted returns.</p>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-2">Market Opportunity</p>
                <p className="text-xs">DeFi tokens showing positive momentum. Research top protocols for potential growth.</p>
              </div>
              
              <button className="bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors w-full flex items-center justify-center">
                View Detailed Analysis
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}