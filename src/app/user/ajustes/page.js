'use client';
import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Moon, Sun, Globe, DollarSign, Eye, EyeOff } from 'lucide-react';

export default function AjustesPage() {
  const [settings, setSettings] = useState({
    // Notificaciones
    priceAlerts: true,
    dailySummary: false,
    marketNews: true,
    portfolioUpdates: true,
    
    // Seguridad
    twoFactorAuth: false,
    emailVerification: true,
    biometricLogin: false,
    sessionTimeout: 30, // minutos
    
    // Apariencia
    theme: 'dark', // 'light', 'dark', 'auto'
    language: 'es', // 'es', 'en', 'pt'
    currency: 'USD', // 'USD', 'EUR', 'GBP', 'BTC', 'ETH'
    chartType: 'candlestick', // 'line', 'candlestick', 'bar'
    compactView: false,
    
    // Privacidad
    showBalance: true,
    hideSmallAmounts: false,
    dataSharing: false,
    analyticsEnabled: true
  });

  const [showSecret, setShowSecret] = useState(false);

  const handleSimpleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // Guardar en localStorage
    localStorage.setItem('cryptoWebSettings', JSON.stringify(settings));
    
    // Mostrar notificación de éxito
    const notification = document.createElement('div');
    notification.className = 'toast toast-top toast-end';
    notification.innerHTML = `
      <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Ajustes guardados exitosamente</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <SettingsIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-white">Ajustes</h1>
        </div>

        <div className="grid gap-6">
          {/* Notificaciones */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Bell className="w-5 h-5 text-warning" />
                Notificaciones
              </h2>
              
              <div className="grid gap-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Alertas de precios</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.priceAlerts}
                      onChange={(e) => handleSimpleChange('priceAlerts', e.target.checked)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Resumen diario del mercado</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.dailySummary}
                      onChange={(e) => handleSimpleChange('dailySummary', e.target.checked)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Noticias del mercado</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.marketNews}
                      onChange={(e) => handleSimpleChange('marketNews', e.target.checked)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Actualizaciones del portafolio</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.portfolioUpdates}
                      onChange={(e) => handleSimpleChange('portfolioUpdates', e.target.checked)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Seguridad
              </h2>
              
              <div className="grid gap-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Autenticación de dos factores</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSimpleChange('twoFactorAuth', e.target.checked)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Verificación por email</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.emailVerification}
                      onChange={(e) => handleSimpleChange('emailVerification', e.target.checked)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Inicio biométrico</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={settings.biometricLogin}
                      onChange={(e) => handleSimpleChange('biometricLogin', e.target.checked)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tiempo de espera de sesión (minutos)</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSimpleChange('sessionTimeout', parseInt(e.target.value))}
                  >
                    <option value={15}>15 minutos</option>
                    <option value={30}>30 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={120}>2 horas</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Apariencia */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Palette className="w-5 h-5 text-info" />
                Apariencia
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tema</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={settings.theme}
                    onChange={(e) => handleSimpleChange('theme', e.target.value)}
                  >
                    <option value="light">Claro ☀️</option>
                    <option value="dark">Oscuro 🌙</option>
                    <option value="auto">Automático 🔄</option>
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Idioma</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={settings.language}
                    onChange={(e) => handleSimpleChange('language', e.target.value)}
                  >
                    <option value="es">Español 🇪🇸</option>
                    <option value="en">English 🇺🇸</option>
                    <option value="pt">Português 🇧🇷</option>
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Moneda por defecto</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={settings.currency}
                    onChange={(e) => handleSimpleChange('currency', e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BTC">BTC (₿)</option>
                    <option value="ETH">ETH (Ξ)</option>
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tipo de gráfico</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={settings.chartType}
                    onChange={(e) => handleSimpleChange('chartType', e.target.value)}
                  >
                    <option value="line">Líneas</option>
                    <option value="candlestick">Velas japonesas</option>
                    <option value="bar">Barras</option>
                  </select>
                </div>
              </div>
              
              <div className="form-control mt-4">
                <label className="label cursor-pointer">
                  <span className="label-text">Vista compacta</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={settings.compactView}
                    onChange={(e) => handleSimpleChange('compactView', e.target.checked)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex gap-4 justify-end">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showSecret ? 'Ocultar' : 'Mostrar'} ajustes secretos
                </button>
                
                <button
                  className="btn btn-primary"
                  onClick={saveSettings}
                >
                  Guardar ajustes
                </button>
              </div>
              
              {/* Ajustes secretos */}
              {showSecret && (
                <div className="divider">Ajustes Secretos</div>
              )}
              
              {showSecret && (
                <div className="grid gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-warning">⚠️ API Key (avanzado)</span>
                    </label>
                    <input
                      type="password"
                      className="input input-bordered input-warning"
                      placeholder="Tu API key personal..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}