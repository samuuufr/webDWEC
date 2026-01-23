'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

export default function CryptoDashboard() {
  const [marketData, setMarketData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
        
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h,24h,7d',
          {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (compatible; CryptoWeb/1.0)'
            }
          }
        );
        
        clearTimeout(timeoutId);
        
        const data = await response.json();
        setMarketData(data);
        if (typeof window !== 'undefined') {
          console.log('Market data fetched:', data);
        }
        
        const formattedData = data.map(coin => ({
          name: coin.symbol.toUpperCase(),
          price: coin.current_price,
          marketCap: coin.market_cap,
          volume: coin.total_volume,
          change24h: coin.price_change_percentage_24h,
          sparkline: coin.sparkline_in_7d?.price || []
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Error al cargar datos del mercado');
        // Fallback demo data
        const fallbackData = [
          { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 45000, market_cap: 880000000000, total_volume: 25000000000, price_change_percentage_24h: 2.5, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
          { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3000, market_cap: 360000000000, total_volume: 15000000000, price_change_percentage_24h: -1.2, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
          { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', current_price: 420, market_cap: 65000000000, total_volume: 1200000000, price_change_percentage_24h: 3.1, image: 'https://assets.coingecko.com/coins/images/825/small/binancecoin.png' },
          { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.55, market_cap: 19000000000, total_volume: 450000000, price_change_percentage_24h: -0.8, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
          { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 120, market_cap: 52000000000, total_volume: 2100000000, price_change_percentage_24h: 4.2, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' }
        ];
        setMarketData(fallbackData);
        
        const formattedData = fallbackData.map(coin => ({
          name: coin.symbol.toUpperCase(),
          price: coin.current_price,
          marketCap: coin.market_cap,
          volume: coin.total_volume,
          change24h: coin.price_change_percentage_24h,
          sparkline: []
        }));
        setChartData(formattedData);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const topGainers = marketData
    .filter(coin => coin.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const topLosers = marketData
    .filter(coin => coin.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  // Debug logs to check data (solo en desarrollo)
  if (typeof window !== 'undefined') {
    console.log('Market data length:', marketData.length);
    console.log('Top gainers:', topGainers);
    console.log('Top losers:', topLosers);
  }

  const marketStats = {
    totalMarketCap: marketData.reduce((sum, coin) => sum + coin.market_cap, 0),
    totalVolume: marketData.reduce((sum, coin) => sum + coin.total_volume, 0),
    avgChange: marketData.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / marketData.length
  };

  const pieData = marketData.slice(0, 8).map(coin => ({
    name: coin.name,
    value: coin.market_cap
  }));

  const COLORS = ['#FF6B35', '#F7931A', '#627EEA', '#00D4AA', '#1E3A8A', '#DC2626', '#7C3AED', '#059669'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <BarChart3 className="w-8 h-8 text-purple-500" />
        <h1 className="text-4xl font-bold">Market Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 shadow-lg rounded-lg">
          <div className="stat-figure text-primary">
            <DollarSign className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Market Cap</div>
          <div className="stat-value text-primary">
            ${(marketStats.totalMarketCap / 1e9).toFixed(2)}B
          </div>
        </div>
        
        <div className="stat bg-base-100 shadow-lg rounded-lg">
          <div className="stat-figure text-secondary">
            <Activity className="w-8 h-8" />
          </div>
          <div className="stat-title">24h Volume</div>
          <div className="stat-value text-secondary">
            ${(marketStats.totalVolume / 1e9).toFixed(2)}B
          </div>
        </div>

        <div className={`stat bg-base-100 shadow-lg rounded-lg ${marketStats.avgChange >= 0 ? 'text-success' : 'text-error'}`}>
          <div className="stat-figure">
            {marketStats.avgChange >= 0 ? (
              <TrendingUp className="w-8 h-8" />
            ) : (
              <TrendingDown className="w-8 h-8" />
            )}
          </div>
          <div className="stat-title">Avg Change 24h</div>
          <div className="stat-value">
            {marketStats.avgChange >= 0 ? '+' : ''}{marketStats.avgChange.toFixed(2)}%
          </div>
        </div>

        <div className="stat bg-base-100 shadow-lg rounded-lg">
          <div className="stat-figure text-accent">
            <PieChartIcon className="w-8 h-8" />
          </div>
          <div className="stat-title">Active Coins</div>
          <div className="stat-value text-accent">{marketData.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Price Chart - Top 10</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#FF6B35" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Market Cap Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(value / 1e9).toFixed(2)}B`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Top Gainers 24h
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topGainers.length > 0 ? (
                    topGainers.map((coin) => (
                      <tr key={coin.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                            <span>{coin.symbol.toUpperCase()}</span>
                          </div>
                        </td>
                        <td>${coin.current_price.toLocaleString()}</td>
                        <td className="text-success">
                          +{coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <div className="flex flex-col items-center gap-2">
                          <TrendingUp className="w-8 h-8 text-gray-400" />
                          <span className="text-gray-500">No gainers found in current market data</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-error" />
              Top Losers 24h
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topLosers.length > 0 ? (
                    topLosers.map((coin) => (
                      <tr key={coin.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                            <span>{coin.symbol.toUpperCase()}</span>
                          </div>
                        </td>
                        <td>${coin.current_price.toLocaleString()}</td>
                        <td className="text-error">
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <div className="flex flex-col items-center gap-2">
                          <TrendingDown className="w-8 h-8 text-gray-400" />
                          <span className="text-gray-500">No losers found in current market data</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}