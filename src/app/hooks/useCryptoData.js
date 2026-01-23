import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCryptoData() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'market_cap',
    sortOrder: 'desc',
    minPrice: '',
    maxPrice: '',
    category: 'all'
  });

  const fetchCryptos = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${filters.sortOrder}&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
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
      let filteredData = data || [];
      
      // Aplicar filtros
      if (filters.search) {
        filteredData = filteredData.filter(crypto => 
          crypto.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.minPrice) {
        filteredData = filteredData.filter(crypto => 
          crypto.current_price >= parseFloat(filters.minPrice)
        );
      }
      
      if (filters.maxPrice) {
        filteredData = filteredData.filter(crypto => 
          crypto.current_price <= parseFloat(filters.maxPrice)
        );
      }
      
      if (filters.category !== 'all') {
        // Categorías simplificadas basadas en market cap
        const categories = {
          'large-cap': (crypto) => crypto.market_cap > 10000000000,
          'mid-cap': (crypto) => crypto.market_cap > 1000000000 && crypto.market_cap <= 10000000000,
          'small-cap': (crypto) => crypto.market_cap <= 1000000000,
          'defi': (crypto) => ['uniswap', 'chainlink', 'aave', 'compound', 'maker'].some(tag => crypto.id.includes(tag)),
          'nft': (crypto) => ['theta', 'enjin', 'decentraland', 'sandbox'].some(tag => crypto.id.includes(tag))
        };
        
        if (categories[filters.category]) {
          filteredData = filteredData.filter(categories[filters.category]);
        }
      }
      
      setCryptos(filteredData);
      setError(null);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Error al cargar datos de criptomonedas');
      
      // Datos de fallback
      const fallbackData = [
        { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 45000, market_cap: 880000000000, total_volume: 25000000000, price_change_percentage_24h: 2.5, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
        { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3000, market_cap: 360000000000, total_volume: 15000000000, price_change_percentage_24h: -1.2, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
        { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', current_price: 420, market_cap: 65000000000, total_volume: 1200000000, price_change_percentage_24h: 3.1, image: 'https://assets.coingecko.com/coins/images/825/small/binancecoin.png' }
      ];
      setCryptos(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, [filters]);

  return {
    cryptos,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchCryptos
  };
}