import Link from "next/link";
import React, {Component} from "react";

export default function Breadcrumbs({ rutas }) {
  return (
    //Breadcrumbs daisyUI: https://daisyui.com/components/breadcrumbs/?lang=es#breadcrumbs
    <div className="breadcrumbs text-sm">
    <ul>
        {rutas.map((ruta, index) => {
            const esUltima = index === rutas.length - 1;
            return (
                <li key={index}>
                {!esUltima && ruta.href ? (
                    <Link href={ruta.href}>{ruta.label}</Link>
                ) : (
                    ruta.label // última ruta → texto plano
                )}
                </li>
            );
        })}
  </ul>
</div>
  );
}
