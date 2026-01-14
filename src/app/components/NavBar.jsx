

import React, { Component }from "react";
import Link from "next/link";

export default class NavBar extends Component {
    render(){
        return (
            <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Samuel WEB</a>
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
          <Link className="justify-between" href="user/profile">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link href="user/settings">Settings</Link></li>
        <li><Link href="user/logout">Logout</Link></li>
      </ul>
    </div>
  </div>
</div>
            
        )
    }
}