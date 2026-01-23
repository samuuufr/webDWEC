'use client';
import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useCryptoData } from '@/app/hooks/useCryptoData';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CryptoCharts() {
  const { cryptos, loading } = useCryptoData();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (cryptos.length > 0) {
      const top10 = cryptos.slice(0, 10);
      
      // Datos para gráfico de barras - Market Cap
      const marketCapData = {
        labels: top10.map(crypto => crypto.symbol),
        datasets: [
          {
            label: 'Capitalización de Mercado (B USD)',
            data: top10.map(crypto => (crypto.market_cap / 1000000000).toFixed(2)),
            backgroundColor: 'rgba(255, 107, 53, 0.6)',
            borderColor: 'rgba(255, 107, 53, 1)',
            borderWidth: 1,
          },
        ],
      };

      // Datos para gráfico de líneas - Cambios 24h
      const priceChangeData = {
        labels: top10.map(crypto => crypto.symbol),
        datasets: [
          {
            label: 'Cambio 24h (%)',
            data: top10.map(crypto => crypto.price_change_percentage_24h),
            borderColor: crypto.price_change_percentage_24h >= 0 ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)',
            backgroundColor: crypto.price_change_percentage_24h >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      };

      // Datos para gráfico de volumen
      const volumeData = {
        labels: top10.map(crypto => crypto.symbol),
        datasets: [
          {
            label: 'Volumen 24h (B USD)',
            data: top10.map(crypto => (crypto.total_volume / 1000000000).toFixed(2)),
            backgroundColor: 'rgba(99, 102, 241, 0.6)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData({
        marketCap: marketCapData,
        priceChange: priceChangeData,
        volume: volumeData,
      });
    }
  }, [cryptos]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        color: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  if (loading || !chartData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Análisis Gráfico del Mercado</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Capitalización de Mercado */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Capitalización de Mercado - Top 10</h3>
            <div className="h-64">
              <Bar 
                data={chartData.marketCap} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: 'Capitalización de Mercado (B USD)',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Gráfico de Cambios 24h */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Variación 24h - Top 10</h3>
            <div className="h-64">
              <Line 
                data={chartData.priceChange} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: 'Cambio Porcentual 24h (%)',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Gráfico de Volumen */}
        <div className="card bg-base-100 shadow-xl lg:col-span-2">
          <div className="card-body">
            <h3 className="card-title text-lg">Volumen de Trading 24h - Top 10</h3>
            <div className="h-64">
              <Bar 
                data={chartData.volume} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: 'Volumen de Trading (B USD)',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Estadísticas del Mercado</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stat">
              <div className="stat-title">Total Criptomonedas</div>
              <div className="stat-value text-2xl">{cryptos.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Promedio Cambio 24h</div>
              <div className={`stat-value text-2xl ${
                cryptos.reduce((sum, c) => sum + c.price_change_percentage_24h, 0) / cryptos.length >= 0 
                  ? 'text-success' 
                  : 'text-error'
              }`}>
                {(cryptos.reduce((sum, c) => sum + c.price_change_percentage_24h, 0) / cryptos.length).toFixed(2)}%
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Market Cap Total</div>
              <div className="stat-value text-2xl">
                ${(cryptos.reduce((sum, c) => sum + c.market_cap, 0) / 1000000000).toFixed(0)}B
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Volumen Total 24h</div>
              <div className="stat-value text-2xl">
                ${(cryptos.reduce((sum, c) => sum + c.total_volume, 0) / 1000000000).toFixed(0)}B
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}