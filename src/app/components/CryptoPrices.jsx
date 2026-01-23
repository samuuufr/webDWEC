'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, Activity } from 'lucide-react';

export default function CryptoPrices() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
        
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h',
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
        setCryptos(data);
        if (typeof window !== 'undefined') {
          console.log('Crypto prices data:', data);
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setError('Error al cargar datos de criptomonedas');
        // Fallback demo data
        setCryptos([
          { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 45000, market_cap: 880000000000, total_volume: 25000000000, price_change_percentage_24h: 2.5, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
          { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3000, market_cap: 360000000000, total_volume: 15000000000, price_change_percentage_24h: -1.2, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
          { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', current_price: 420, market_cap: 65000000000, total_volume: 1200000000, price_change_percentage_24h: 3.1, image: 'https://assets.coingecko.com/coins/images/825/small/binancecoin.png' },
          { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.55, market_cap: 19000000000, total_volume: 450000000, price_change_percentage_24h: -0.8, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
          { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 120, market_cap: 52000000000, total_volume: 2100000000, price_change_percentage_24h: 4.2, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
    const interval = setInterval(fetchCryptos, 30000);
    return () => clearInterval(interval);
  }, []);

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
        <Bitcoin className="w-8 h-8 text-orange-500" />
        <h1 className="text-4xl font-bold">Crypto Prices</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cryptos.length > 0 ? (
          cryptos.map((crypto) => (
          <div key={crypto.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
                  <div>
                    <h2 className="card-title">{crypto.name}</h2>
                    <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
                  <div className={`flex items-center gap-1 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Market Cap</p>
                  <p className="font-semibold">${crypto.market_cap.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Volume 24h</p>
                  <p className="font-semibold">${crypto.total_volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Bitcoin className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No se pudieron cargar los datos de criptomonedas</p>
            <p className="text-gray-400 text-sm">Porfavor revisa tu conexión a internet.</p>
          </div>
        )}
      </div>
    </div>
  );
}