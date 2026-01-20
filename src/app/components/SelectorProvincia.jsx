import React from "react";
import {useState} from "react";

export default function SelectorProvincia({onProvinciaChange}){
        
        const [provincia, setProvincia] = useState("VALLADOLID");
    
        const handleSelectChange = (event) => {
            const provinciaSeleccionada = event.target.value;
            console.log(`Provincia seleccionada: ${provinciaSeleccionada}`);
            setProvincia(provinciaSeleccionada); //Actualiza el estado del selector
            onProvinciaChange(provinciaSeleccionada); //Esto es una prop (que en este caso es una función para actualizar la provincia también en el componente padre)  
        };



        return (
            // Lo que tenga la cabecera
            <select value={provincia} name="provincia" id="provincia" onChange={handleSelectChange}>
                <option value="AVILA">Ávila</option>
                <option value="BURGOS">Burgos</option>
                <option value="LEON">León</option>
                <option value="PALENCIA">Palencia</option>
                <option value="SALAMANCA">Salamanca</option>
                <option value="SEGOVIA">Segovia</option>
                <option value="SORIA">Soria</option>
                <option value="VALLADOLID">Valladolid</option>
                <option value="ZAMORA">Zamora</option>
            </select>
        );
    
}