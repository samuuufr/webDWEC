'use client';

import React from "react";

// Este import hace que no se renderice en el servidor el mapa
import dynamic from "next/dynamic";
const Mapa = dynamic(() => import("./Mapa"), { ssr: false });

// DaisyUI. Medium Card. Obtenido de: https://daisyui.com/components/card/?lang=es#card-sizes
//Este componente tiene la prop centro con Destructuring
//Ejemplos: https://www.w3schools.com/react/react_props_destructuring.asp

export default function CentroCard({centro}) {
      if (!centro) return null; // No renderiza nada si el objeto centro no existe

  const nombre = [
    centro.denominacion_generica_breve,
    centro.denominacion_especifica
  ].filter(Boolean).join(" "); // Combina solo valores no vacíos

  const lat = centro.localizacion?.lat;
  const lon = centro.localizacion?.lon;

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        {nombre && <h2 className="card-title">{nombre}</h2>}

        {centro.localidad && (
          <p><strong>Localidad:</strong> {centro.localidad}</p>
        )}
        {centro.provincia && (
          <p><strong>Provincia:</strong> {centro.provincia}</p>
        )}
        {centro.codigo && (
          <p><strong>Código:</strong> {centro.codigo}</p>
        )}
        {centro.telefono && (
          <p><strong>Teléfono:</strong> {centro.telefono}</p>
        )}
        {centro.correo_electronico && (
          <p><strong>Email:</strong> {centro.correo_electronico}</p>
        )}

        <button className="btn btn-primary">Favorito</button>
      </div>

      {/* Solo renderiza el mapa si existen coordenadas válidas */}
      {lat != null && lon != null && (
        <Mapa
          x={lat}
          y={lon}
          etiqueta={nombre || "Centro"}
        />
      )}
    </div>
  );
}
