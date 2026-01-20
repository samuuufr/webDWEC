import React from "react";

export default function EncabezadoH2({children}) {
    return (
        // Lo que tenga la cabecera
        <h2 className="text-2xl font-bold my-8">
            {children}
        </h2>
    );
    
}