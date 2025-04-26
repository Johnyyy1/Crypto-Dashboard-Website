import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CoinDetail = () => {
  const { id } = useParams(); 
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coin details');
        }
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{coinData.name}</h2>
        <p className="text-lg mb-2">Symbol: {coinData.symbol}</p>
        <p className="text-lg mb-2">Price: ${coinData.market_data.current_price.usd}</p>
        <p className="text-lg mb-2">Market Cap: ${coinData.market_data.market_cap.usd}</p>
        <p className="text-lg mb-2">24h Volume: ${coinData.market_data.total_volume.usd}</p>
        <p className="text-lg mb-4">Description: {coinData.description.en}</p>

        <img src={coinData.image.large} alt={coinData.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
      </div>
    </div>
  );
};

export default CoinDetail;
