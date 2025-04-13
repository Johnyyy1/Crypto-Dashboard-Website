import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrace Chart.js komponent
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoCard = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
      const data = await response.json();
      setCryptoData(data);
    };
    fetchCryptoData();
  }, []);

  const getChartData = (prices, priceChange) => {
    // Změna barvy na základě směru změny ceny
    const borderColor = priceChange >= 0 ? '#34D399' : '#F87171'; // Zelená pro růst, červená pro pokles
    const backgroundColor = priceChange >= 0 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'; // Zelená pro růst, červená pro pokles

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
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        }
      }
    }
  };

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden relative">
      {/* Pozadí se vzorem */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white bg-opacity-70 z-0 w-full"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}>
      </div>
      
      {/* Blobs pro širší obrazovky */}
      <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 blur-3xl opacity-25"></div>
      <div className="absolute bottom-1/4 right-10 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 blur-3xl opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-3xl opacity-25"></div>

      {/* Karty s informacemi o kryptoměnách */}
      <div className="space-y-6 z-10 relative">
        {cryptoData.map(crypto => (
          <div
            key={crypto.id}
            className="bg-white border border-gray-100 rounded-xl p-6 flex items-center justify-between gap-6 shadow-md w-full max-w-screen-lg mx-auto hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="bg-blue-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center">
                <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-gray-700 font-medium text-xl">{crypto.name}</p>
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

            <div className="w-full max-w-[500px] h-20">
              <Line data={getChartData(crypto.sparkline_in_7d.price, crypto.price_change_percentage_24h)} options={getChartOptions} />
            </div>

            <p className="text-lg text-gray-600">${crypto.current_price.toLocaleString()}</p>

            <div className="flex flex-col text-sm text-gray-600">
              <p>Market Cap:</p>
              <p>${crypto.market_cap.toLocaleString()}</p>
            </div>

            <div className="flex flex-col text-sm text-gray-600">
              <p>24h Volume:</p>
              <p>${crypto.total_volume.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoCard;
