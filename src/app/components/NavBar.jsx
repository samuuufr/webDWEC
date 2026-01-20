import React, {Component} from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar(){
    
        return (
            // Lo que tenga la barra de navegación
           <div className="navbar bg-base-100 shadow-sm">
              <div className="flex-1">
                <Link className="btn btn-ghost text-xl" href="">
                  <Image
                                className="dark:invert"
                                src="/logo-belen.svg"
                                alt="Logo Belén Web"
                                width={50}
                                height={50}
                              /></Link>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                      <Link className="justify-between" href="/user/profile">
                        Profile
                      </Link>
                    </li>
                    <li><Link href="/user/settings">Settings</Link></li>
                    <li><Link href="/user/dashboard">Dashboard</Link></li>
                    <li><Link href="">Logout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
        );
    
}