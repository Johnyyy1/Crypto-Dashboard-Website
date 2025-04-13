import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoCard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching crypto data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCryptoData();
  }, []);

  const getChartData = (prices, priceChange) => {
    // Change color based on price direction
    const borderColor = priceChange >= 0 ? '#34D399' : '#F87171'; // Green for increase, red for decrease
    const backgroundColor = priceChange >= 0 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)';

    return {
      labels: Array(prices.length).fill(''),
      datasets: [
        {
          data: prices,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        }
      ]
    };
  };

  const getChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading crypto data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <p className="text-red-500 font-medium text-lg mb-2">Error loading data</p>
          <p className="text-gray-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden relative px-4 py-8 md:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white bg-opacity-70 z-0 w-full"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}>
      </div>
      
      {/* Gradient blobs for wider screens */}
      <div className="hidden md:block absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 blur-3xl opacity-25"></div>
      <div className="hidden md:block absolute bottom-1/4 right-10 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 blur-3xl opacity-30"></div>
      <div className="hidden md:block absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 blur-3xl opacity-20"></div>
      <div className="hidden md:block absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-3xl opacity-25"></div>

      {/* Dashboard title */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Crypto Dashboard</h1>
        <p className="text-gray-600 mt-2">Live cryptocurrency price tracker</p>
      </div>

      {/* Crypto cards */}
      <div className="space-y-4 md:space-y-6 z-10 relative max-w-6xl mx-auto">
        {cryptoData.map(crypto => (
          <div
            key={crypto.id}
            className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 shadow-md w-full mx-auto hover:shadow-lg transition-all"
          >
            {/* Mobile layout - stacked */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                    <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">{crypto.name}</p>
                    <p className="text-xs text-gray-600">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800">${crypto.current_price.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-between mb-4">
                <p
                  className={`text-sm font-medium ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
                <div className="grid grid-cols-2 gap-2 text-right">
                  <div className="text-xs text-gray-600">
                    <p>Market Cap:</p>
                    <p className="font-medium">${formatLargeNumber(crypto.market_cap)}</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>24h Volume:</p>
                    <p className="font-medium">${formatLargeNumber(crypto.total_volume)}</p>
                  </div>
                </div>
              </div>
              
              <div className="h-24 w-full">
                <Line data={getChartData(crypto.sparkline_in_7d.price, crypto.price_change_percentage_24h)} options={getChartOptions} />
              </div>
            </div>

            {/* Desktop/tablet layout - row */}
            <div className="hidden md:flex md:items-center md:justify-between md:gap-4 lg:gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 rounded-lg p-2 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                  <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium text-lg">{crypto.name}</p>
                  <p className="text-sm text-gray-600">{crypto.symbol.toUpperCase()}</p>
                </div>
              </div>

              <p
                className={`text-sm font-medium ${
                  crypto.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>

              <div className="w-full max-w-xs lg:max-w-md h-16">
                <Line data={getChartData(crypto.sparkline_in_7d.price, crypto.price_change_percentage_24h)} options={getChartOptions} />
              </div>

              <p className="text-lg font-medium text-gray-800 whitespace-nowrap">${crypto.current_price.toLocaleString()}</p>

              <div className="hidden lg:flex lg:flex-col text-sm text-gray-600">
                <p>Market Cap:</p>
                <p className="font-medium">${formatLargeNumber(crypto.market_cap)}</p>
              </div>

              <div className="hidden lg:flex lg:flex-col text-sm text-gray-600">
                <p>24h Volume:</p>
                <p className="font-medium">${formatLargeNumber(crypto.total_volume)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to format large numbers
const formatLargeNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toLocaleString();
};

export default CryptoCard;