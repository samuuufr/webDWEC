import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bitcoin, TrendingUp, Wallet, BarChart3 } from "lucide-react";

export default function NavBar(){
    
        return (
           <div className="navbar bg-base-100 shadow-lg">
              <div className="flex-1">
                <Link className="btn btn-ghost text-xl flex items-center gap-2" href="/">
                  <Bitcoin className="w-8 h-8 text-orange-500" />
                  <span className="font-bold">CryptoWeb</span>
                </Link>
              </div>
              
              <div className="flex-none hidden md:block">
                <ul className="menu menu-horizontal px-1">
                  
                  <li>
                    <Link href="/" className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/mercado" className="flex items-center gap-2">
                      <Bitcoin className="w-4 h-4" />
                      Mercado
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Portafolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/estadisticas" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Estadísticas
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Panel
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                      <Link className="justify-between" href="/user/perfil">
                        Perfil
                      </Link>
                    </li>
                    <li><Link href="/user/ajustes">Configuración</Link></li>
                    <li><Link href="/user/panel">Panel</Link></li>
                    <li><Link href="/portfolio">Portafolio</Link></li>
                    <li><Link href="">Cerrar sesión</Link></li>
                  </ul>
                </div>
              </div>
            </div>
        );
    
}