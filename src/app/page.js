import Link from 'next/link';
import { Bitcoin, TrendingUp, BarChart3, Wallet, Search, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-4xl mx-auto px-4">
            {/* Logo y título principal */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Bitcoin className="w-16 h-16 text-orange-500" />
                <h1 className="text-6xl font-bold text-white">CryptoWeb</h1>
              </div>
              <p className="text-2xl text-gray-300 mb-4">
                Tu plataforma integral de criptomonedas
              </p>
              <p className="text-lg text-gray-400">
                Análisis en tiempo real • Gestión de portafolio • Estadísticas avanzadas
              </p>
            </div>

            {/* Tarjetas de características principales - Grid 3x2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Primera fila */}
              <div className="card bg-base-100/10 backdrop-blur-sm border border-white/10">
                <div className="card-body p-6 text-center">
                  <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Mercado en Vivo</h3>
                  <p className="text-gray-300 text-sm">
                    Precios actualizados en tiempo real de las principales criptomonedas
                  </p>
                </div>
              </div>

              <div className="card bg-base-100/10 backdrop-blur-sm border border-white/10">
                <div className="card-body p-6 text-center">
                  <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Análisis Avanzado</h3>
                  <p className="text-gray-300 text-sm">
                    Gráficos interactivos y estadísticas detalladas del mercado
                  </p>
                </div>
              </div>

              <div className="card bg-base-100/10 backdrop-blur-sm border border-white/10">
                <div className="card-body p-6 text-center">
                  <Wallet className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Portafolio Inteligente</h3>
                  <p className="text-gray-300 text-sm">
                    Analiza tus activos digitales con seguimiento de rendimiento
                  </p>
                </div>
              </div>

              {/* Segunda fila */}
              <div className="card bg-base-100/10 backdrop-blur-sm border border-white/10">
                <div className="card-body p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Reportes Detallados</h3>
                  <p className="text-gray-300 text-sm">
                    Análisis completos de tu rendimiento y tendencias del mercado
                  </p>
                </div>
              </div>

              <div className="card bg-base-100/10 backdrop-blur-sm border border-white/10">
                <div className="card-body p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
                  <h3 className="text-xl font-bold text-white mb-2">Soporte Continuo</h3>
                  <p className="text-gray-300 text-sm">
                    Asistencia técnica disponible todo el día, todos los días
                  </p>
                </div>
              </div>

              <div className="card bg-base-100/10 backdrop-blur-sm border border-white/10">
                <div className="card-body p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                  <h3 className="text-xl font-bold text-white mb-2">Criptomonedas</h3>
                  <p className="text-gray-300 text-sm">
                    Amplia variedad de activos digitales para diversificar
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción principales*/}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 mt-16">
              <Link 
                href="/mercado" 
                className="btn btn-primary btn-lg px-12 py-4 text-lg font-semibold"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Explorar Mercado
              </Link>
              <Link 
                href="/portfolio" 
                className="btn btn-outline btn-accent btn-lg px-12 py-4 text-lg font-semibold border-white/20 text-white hover:bg-white/10"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Mi Portafolio
              </Link>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">10K+</div>
                <div className="text-gray-300">Criptomonedas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">$2.5T+</div>
                <div className="text-gray-300">Market Cap</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">$150B+</div>
                <div className="text-gray-300">Volumen 24h</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
