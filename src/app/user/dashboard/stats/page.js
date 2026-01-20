'use client';
import EncabezadoH3 from "@/app/components/EncabezadoH3";
import SpinnerCargando from "@/app/components/SpinnerCargando";
import React from "react";
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registramos los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function Stats() {
  const [dataJson, setDataJson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inicializamos los datos del gráfico con valores en 0
  const [datosGrafico, setDatosGrafico] = useState({
    labels: [],
    datasets: [
      {
        label: 'Centros por provincia',
        data: [],
        backgroundColor: 'rgba(34,197,94,0.7)',
      }
    ]
  });

  useEffect(() => {
    fetch('/data/directorio-de-centros-docentes.json')
      .then(res => res.json())
      .then(data => {
        setDataJson(data);
        setLoading(false);

        // Contar centros por provincia
        const conteoPorProvincia = data.reduce((acc, centro) => {
          const prov = centro.provincia || 'Sin provincia';
          acc[prov] = (acc[prov] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(conteoPorProvincia);
        const valores = Object.values(conteoPorProvincia);

        // Inicializamos con ceros para que se anime
        setDatosGrafico({
          labels,
          datasets: [
            {
              label: 'Centros por provincia',
              data: valores.map(() => 0), // empieza en 0
              backgroundColor: 'rgba(34,197,94,0.7)',
            }
          ]
        });

        // Actualizamos los valores reales después de un pequeño delay
        setTimeout(() => {
          setDatosGrafico({
            labels,
            datasets: [
              {
                label: 'Centros por provincia',
                data: valores, // ahora los valores reales
                backgroundColor: 'rgba(34,197,94,0.7)',
              }
            ]
          });
        }, 50); // 50ms es suficiente para activar la animación
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Centros educativos de Castilla y León' },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce', // efecto rebote
    },
    scales: {
      y: { beginAtZero: true },
    }
  };

  if (loading) return <SpinnerCargando />;

  return (
    <div>
      <EncabezadoH3>Estadísticas</EncabezadoH3>
      <p>Total de centros: {dataJson.length}</p>
      <Bar data={datosGrafico} options={options} />
    </div>
  );
}
