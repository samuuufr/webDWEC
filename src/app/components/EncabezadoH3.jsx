import React  from "react";

export default function EncabezadoH3({children}) {
    return (
        // Lo que tenga la cabecera
        <h3 className="text-l font-bold my-8">
            {children}
        </h3>
    );
    
}