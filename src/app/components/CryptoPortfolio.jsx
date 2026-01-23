'use client';
import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Minus, X, Edit2, Save, XCircle } from 'lucide-react';

export default function CryptoPortfolio() {
  // Estado unificado para evitar errores de render
  const [portfolio, setPortfolio] = useState([
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', amount: 0, buyPrice: 30000 },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', amount: 0, buyPrice: 2000 },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', amount: 0, buyPrice: 0.5 }
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showSecret, setShowSecret] = useState(false);
  const [newCrypto, setNewCrypto] = useState({
    id: '',
    symbol: '',
    name: '',
    amount: 0,
    buyPrice: 0
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPrices, setCurrentPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar renders
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Solo fetch si hay criptomonedas en el portfolio
        if (portfolio.length === 0) {
          setCurrentPrices({});
          setLoading(false);
          return;
        }
        
        const cryptoIds = portfolio.map(item => item.id).join(',');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
        
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true`,
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
        if (typeof window !== 'undefined') {
          console.log('Portfolio prices fetched:', data);
        }
        setCurrentPrices(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setError('Error al cargar datos de precios');
        
        // Fallback demo prices
        const fallbackPrices = {
          bitcoin: { usd: 45000, usd_24h_change: 2.5 },
          ethereum: { usd: 3000, usd_24h_change: -1.2 },
          cardano: { usd: 0.55, usd_24h_change: -0.8 }
        };
        setCurrentPrices(fallbackPrices);
      } finally {
        setLoading(false);
      }
    };

    // Fetch inicial y luego cada 30 segundos
    const fetchInitial = () => {
      if (portfolio.length > 0) {
        fetchPrices();
      }
    };
    
    fetchInitial();
    const interval = setInterval(() => {
      if (portfolio.length > 0) {
        fetchPrices();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [portfolio]);

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const currentPrice = currentPrices[item.id]?.usd || 0;
      return total + (item.amount * currentPrice);
    }, 0);
  };

  const calculateProfitLoss = () => {
    return portfolio.reduce((total, item) => {
      const currentPrice = currentPrices[item.id]?.usd || 0;
      const currentValue = item.amount * currentPrice;
      const buyValue = item.amount * item.buyPrice;
      return total + (currentValue - buyValue);
    }, 0);
  };

  const updateAmount = (index, change) => {
    const newPortfolio = [...portfolio];
    newPortfolio[index].amount = Math.max(0, newPortfolio[index].amount + change);
    setPortfolio(newPortfolio);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newPortfolio = [...portfolio];
      newPortfolio[editingIndex] = editForm;
      setPortfolio(newPortfolio);
      setEditingIndex(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm({});
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: field === 'amount' || field === 'buyPrice' ? parseFloat(value) || 0 : value
    }));
  };

const addNewCrypto = () => {
    if (newCrypto.id && newCrypto.symbol && newCrypto.name && newCrypto.amount > 0 && newCrypto.buyPrice > 0) {
      setIsAdding(true);
      
      const existingIndex = portfolio.findIndex(item => item.id === newCrypto.id);
      
      if (existingIndex !== -1) {
        // Si ya existe, solo actualizamos la cantidad
        const newPortfolio = [...portfolio];
        newPortfolio[existingIndex] = {
          ...newPortfolio[existingIndex],
          amount: newPortfolio[existingIndex].amount + newCrypto.amount
        };
        setPortfolio(newPortfolio);
      } else {
        // Es nueva, la agregamos
        setPortfolio([...portfolio, { ...newCrypto, id: newCrypto.id || `custom_${Date.now()}` }]);
      }
      
      // Limpiamos el formulario
      setShowAddForm(false);
      setNewCrypto({
        id: '',
        symbol: '',
        name: '',
        amount: 0,
        buyPrice: 0
      });
      
      setIsAdding(false);
    }
  };

  const removeCrypto = (index) => {
    const newPortfolio = portfolio.filter((_, i) => i !== index);
    setPortfolio(newPortfolio);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const totalValue = calculatePortfolioValue();
  const totalProfitLoss = calculateProfitLoss();
  const profitLossPercentage = totalValue > 0 ? (totalProfitLoss / (totalValue - totalProfitLoss)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Wallet className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-white">Mi Portafolio</h1>
        </div>

        {/* Estadísticas del portafolio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-figure text-primary">
              <Wallet className="w-8 h-8" />
            </div>
            <div className="stat-title">Valor Total</div>
            <div className="stat-value text-2xl font-bold text-primary">${totalValue.toLocaleString()}</div>
          </div>
          
          <div className={`stat bg-base-100 shadow-lg rounded-lg ${totalProfitLoss >= 0 ? 'text-success' : 'text-error'}`}>
            <div className="stat-figure">
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="w-8 h-8" />
              ) : (
                <TrendingDown className="w-8 h-8" />
              )}
            </div>
            <div className="stat-title">Ganancia/Pérdida Total</div>
            <div className="stat-value text-2xl font-bold">
              ${Math.abs(totalProfitLoss).toLocaleString()}
              <div className="text-xs font-normal">
                ({profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-figure text-info">
              <Wallet className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Activos</div>
            <div className="stat-value text-2xl font-bold text-info">{portfolio.length}</div>
          </div>
        </div>

        {/* Tabla de criptomonedas */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-left">Criptomoneda</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-right">Precio Compra</th>
                    <th className="text-right">Precio Actual</th>
                    <th className="text-right">Valor Total</th>
                    <th className="text-right">P&L</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((item, index) => {
                    const currentPrice = currentPrices[item.id]?.usd || 0;
                    const value = item.amount * currentPrice;
                    const buyValue = item.amount * item.buyPrice;
                    const profitLoss = value - buyValue;
                    const profitLossPercentage = buyValue > 0 ? (profitLoss / buyValue) * 100 : 0;

                    return (
                      <tr key={item.id} className="hover:bg-base-200">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="font-bold">{item.symbol}</div>
                            <div className="text-sm opacity-50">{item.name}</div>
                          </div>
                        </td>
                        <td className="text-center">
                          {editingIndex === index ? (
                            <input
                              type="number"
                              step="0.001"
                              value={editForm.amount}
                              onChange={(e) => handleEditChange('amount', e.target.value)}
                              className="input input-bordered input-xs w-16 text-center"
                            />
                          ) : (
                            item.amount.toLocaleString()
                          )}
                        </td>
                        <td className="text-right">
                          {editingIndex === index ? (
                            <input
                              type="number"
                              step="0.01"
                              value={editForm.buyPrice}
                              onChange={(e) => handleEditChange('buyPrice', e.target.value)}
                              className="input input-bordered input-xs w-24 text-right"
                            />
                          ) : (
                            `$${item.buyPrice.toLocaleString()}`
                          )}
                        </td>
                        <td className="text-right">
                          ${currentPrice.toLocaleString()}
                        </td>
                        <td className="text-right font-mono">
                          ${value.toLocaleString()}
                        </td>
                        <td className={`text-right font-mono ${profitLoss >= 0 ? 'text-success' : 'text-error'}`}>
                          <div>
                            ${Math.abs(profitLoss).toLocaleString()}
                            <div className="text-xs">
                              ({profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          {editingIndex === index ? (
                            <div className="flex gap-1">
                              <button 
                                className="btn btn-success btn-xs"
                                onClick={saveEdit}
                              >
                                <Save className="w-3 h-3" />
                              </button>
                              <button 
                                className="btn btn-error btn-xs"
                                onClick={cancelEdit}
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button className="btn btn-ghost btn-xs">
                              <Edit2 className="w-3 h-3" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Criptomoneda
              </button>
              
              <button
                onClick={() => {
                  // Resetear portfolio a valores por defecto
                  const defaultPortfolio = [];
                  setPortfolio(defaultPortfolio);
                  setCurrentPrices({});
                }}
                className="btn btn-outline"
              >
                Resetear Portfolio
              </button>
              
              <div className="badge badge-outline p-3">
                Total: {portfolio.length} activos
              </div>
            </div>

            {/* Formulario para agregar nueva criptomoneda */}
            {showAddForm && (
              <>
                <div className="divider mt-6">Agregar Nueva Criptomoneda</div>
                <div className="grid gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Símbolo (ej. BTC)</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      placeholder="BTC, ETH, ADA..."
                      value={newCrypto.symbol}
                      onChange={(e) => setNewCrypto(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      placeholder="Bitcoin, Ethereum, Cardano..."
                      value={newCrypto.name}
                      onChange={(e) => setNewCrypto(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Cantidad</span>
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      min="0"
                      className="input input-bordered"
                      placeholder="0.5"
                      value={newCrypto.amount}
                      onChange={(e) => setNewCrypto(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Precio de compra ($)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="input input-bordered"
                      placeholder="30000"
                      value={newCrypto.buyPrice}
                      onChange={(e) => setNewCrypto(prev => ({ ...prev, buyPrice: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={addNewCrypto}
                    disabled={!newCrypto.symbol || !newCrypto.name || newCrypto.amount <= 0 || newCrypto.buyPrice <= 0}
                    className="btn btn-success"
                  >
                    Agregar al Portfolio
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewCrypto({
                        id: '',
                        symbol: '',
                        name: '',
                        amount: 0,
                        buyPrice: 0
                      });
                    }}
                    className="btn btn-ghost"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}