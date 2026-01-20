'use client';

// Componentes
import SelectorProvincia from "@/app/components/SelectorProvincia";
import CardCentro from "@/app/components/CardCentro";
import SpinnerCargando from "@/app/components/SpinnerCargando";
import EncabezadoH3 from "@/app/components/EncabezadoH3";

// Hooks
import { useState } from "react";
import { useFetchCentros } from "@/app/hooks/useFetchCentros";


export default function Dashboard() {
   
    const [provincia, setProvincia] = useState("VALLADOLID");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const {centros, loading, total} = useFetchCentros(provincia, page, pageSize);
    const totalPages = Math.ceil(total / pageSize);
    console.log(totalPages);
    return (
      <section>
          <EncabezadoH3>Centros</EncabezadoH3>
          <form>
            <SelectorProvincia onProvinciaChange={(prov)=>{
              setProvincia(prov);
              setPage(1);
            }} />
            {/* Controles de paginación */}
            {/* daisyUI: https://daisyui.com/components/pagination/#extra-small-buttons */}
          {totalPages > 1 && (
            <div className="join">
              <button className="join-item btn" type="button" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                Anterior
              </button>

              <button className="join-item btn">Página {page} de {totalPages}</button>

              <button  className="join-item btn" type="button" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                Siguiente
              </button>
            </div>
          )}
          {/* Este es el contenedor de los centros */}
            <div className="flex flex-wrap justify-start gap-10 m-10">
            {loading ? (
                  <SpinnerCargando /> // 🔹 Solo se ve el spinner
              ) : centros.length === 0 ? (
                <p>No se encontraron centros en {provincia}</p>
              ) : (
                centros.map((centro) => (
                <CardCentro key={centro.codigo} centro={centro}  />
              )))}
    </div>

        

          </form>
      </section>
  );
}