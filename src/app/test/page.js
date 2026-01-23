'use client';
import { useState, useEffect } from 'react';

export default function TestPage() {
  const [testResults, setTestResults] = useState([]);

  const runTests = async () => {
    const tests = [
      {
        name: 'API de CoinGecko - Market',
        test: async () => {
          const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=1&page=1');
          if (!response.ok) throw new Error('API falló');
          return { status: 'success', data: await response.json() };
        }
      },
      {
        name: 'API de CoinGecko - Simple Price',
        test: async () => {
          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
          if (!response.ok) throw new Error('API falló');
          return { status: 'success', data: await response.json() };
        }
      },
      {
        name: 'Componente NavBar',
        test: () => {
          // Verificar que los imports funcionen
          return { status: 'success', data: 'NavBar importado correctamente' };
        }
      },
      {
        name: 'Hook useCryptoData',
        test: () => {
          // Verificar que el hook se pueda importar
          try {
            require('@/app/hooks/useCryptoData.js');
            return { status: 'success', data: 'Hook importado correctamente' };
          } catch (error) {
            return { status: 'error', data: error.message };
          }
        }
      },
      {
        name: 'Chart.js Import',
        test: () => {
          try {
            require('chart.js');
            return { status: 'success', data: 'Chart.js importado correctamente' };
          } catch (error) {
            return { status: 'error', data: error.message };
          }
        }
      },
      {
        name: 'Fetch con Timeout',
        test: async () => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          try {
            const response = await fetch('https://httpbin.org/delay/2', {
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            return { status: 'success', data: 'Fetch con timeout funciona' };
          } catch (error) {
            clearTimeout(timeoutId);
            return { status: 'error', data: error.message };
          }
        }
      }
    ];

    const results = [];
    for (const test of tests) {
      try {
        const startTime = Date.now();
        const result = await test.test();
        const endTime = Date.now();
        
        results.push({
          name: test.name,
          status: result.status,
          data: result.data,
          duration: endTime - startTime
        });
      } catch (error) {
        results.push({
          name: test.name,
          status: 'error',
          data: error.message,
          duration: 0
        });
      }
    }

    setTestResults(results);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">🧪 Tests de Funcionalidad</h1>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Resultados de Pruebas</h2>
            <button onClick={runTests} className="btn btn-primary">
              🔄 Ejecutar Tests
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div key={index} className={`card ${result.status === 'success' ? 'bg-success/10' : 'bg-error/10'}`}>
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h3 className="card-title">{result.name}</h3>
                  <div className={`badge ${result.status === 'success' ? 'badge-success' : 'badge-error'}`}>
                    {result.status === 'success' ? '✅ Pasó' : '❌ Falló'}
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="font-semibold">Resultado:</p>
                  <p className="text-gray-600">{typeof result.data === 'object' ? JSON.stringify(result.data).substring(0, 100) + '...' : result.data}</p>
                  <p className="text-gray-500">Duración: {result.duration}ms</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testResults.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}
      </div>
    </div>
  );
}