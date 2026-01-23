'use client';
import { useCryptoData } from '@/app/hooks/useCryptoData';
import { Search, Filter, RefreshCw, TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';

export default function CryptoListPage() {
  const { cryptos, loading, error, filters, setFilters, refetch } = useCryptoData();

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      sortBy: 'market_cap',
      sortOrder: 'desc',
      minPrice: '',
      maxPrice: '',
      category: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Bitcoin className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-white">Mercado de Criptomonedas</h1>
        </div>

        {/* Barra de Búsqueda Superior - Layout 3x3 */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Filtros de Mercado</h2>
            </div>
            
            {/* Búsqueda principal */}
            <div className="mb-6">
              <div className="flex items-center h-12">
                <span className="bg-base-300/50 border border-r-0 border-base-300 px-6 rounded-l-lg flex items-center h-full">
                  <Search className="w-6 h-6" />
                </span>
                <input
                  type="text"
                  placeholder="Buscar por nombre o símbolo (Bitcoin, BTC, Ethereum, ETH...)"
                  className="flex-1 px-4 rounded-r-lg bg-base-100/50 text-white placeholder-gray-400 h-full border border-base-300 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>

            {/* Grid de filtros - 3x3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Primera fila - Categoría, Precio Min, Precio Max */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Categoría</span>
                </label>
                <select 
                  className="select select-bordered bg-base-100/50 text-white"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="all">Todas las categorías</option>
                  <option value="large-cap">Large Cap (&gt;$10B)</option>
                  <option value="mid-cap">Mid Cap ($1B-$10B)</option>
                  <option value="small-cap">Small Cap (&lt;$1B)</option>
                  <option value="defi">DeFi</option>
                  <option value="nft">NFT</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Precio Mínimo</span>
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  className="input input-bordered bg-base-100/50 text-white placeholder-gray-400"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Precio Máximo</span>
                </label>
                <input
                  type="number"
                  placeholder="$100000"
                  className="input input-bordered bg-base-100/50 text-white placeholder-gray-400"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Segunda fila - Ordenar por, Dirección, Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Ordenar por</span>
                </label>
                <select 
                  className="select select-bordered bg-base-100/50 text-white"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="market_cap">Capitalización</option>
                  <option value="current_price">Precio actual</option>
                  <option value="total_volume">Volumen 24h</option>
                  <option value="price_change_percentage_24h">Cambio 24h</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Dirección</span>
                </label>
                <select 
                  className="select select-bordered bg-base-100/50 text-white"
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                >
                  <option value="desc">Descendente ↓</option>
                  <option value="asc">Ascendente ↑</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Resultados</span>
                </label>
                <div className="badge badge-primary badge-lg p-4 text-white">
                  {cryptos.length} criptomonedas
                </div>
              </div>
            </div>

            {/* Tercera fila - Botones de acción */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-white">Acciones</span>
                </label>
                <div className="flex gap-2">
                  <button 
                    onClick={refetch}
                    className="btn btn-primary flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Actualizando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Actualizar
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <div className="flex gap-2 h-full items-end">
                  <button 
                    onClick={clearFilters}
                    className="btn btn-outline flex-1"
                  >
                    Limpiar todo
                  </button>
                </div>
              </div>

              <div className="form-control">
                <div className="flex gap-2 h-full items-end">
                  <button 
                    onClick={() => setFilters({
                      search: '',
                      sortBy: 'market_cap',
                      sortOrder: 'desc',
                      minPrice: '',
                      maxPrice: '',
                      category: 'all'
                    })}
                    className="btn btn-warning flex-1"
                  >
                    Restablecer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="alert alert-error mb-8">
            <span>{error}</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {/* Resultados */}
        {!loading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cryptos.map((crypto) => (
              <div key={crypto.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
                      <div>
                        <h2 className="card-title text-lg">{crypto.name}</h2>
                        <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
                      <div className={`flex items-center gap-1 ${crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-error'}`}>
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
                      <p className="text-gray-500">Cap. Mercado</p>
                      <p className="font-semibold">${crypto.market_cap.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Volumen 24h</p>
                      <p className="font-semibold">${crypto.total_volume.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && cryptos.length === 0 && !error && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron criptomonedas con los filtros seleccionados</p>
            <button 
              onClick={clearFilters}
              className="btn btn-outline mt-4"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}