//Aquí se hace un Custom Hook
//Ejemplos: https://www.w3schools.com/react/react_customhooks.asp

import {useEffect, useState} from 'react';

export function useFetchCentros(provincia, page = 1, pageSize = 10){
     // Hook: Es una función especial para utilizar características de React dentro de componentes
    
    //useState() => Es un hook que se utiliza para agregar una variable de estado al componente, cuando su valor cambia el componente se renderiza de nuevo en la página.
    // const [value, setValue] = useState("")
    // value = Estado actual;
    // setValue = Función para actualizar el estado;
    // Se le pasa como parámetro el valor inicial, en este ejemplo vacío "".
    // Ejemplos: https://www.w3schools.com/react/react_usestate.asp

    //Se guardan estas variables en el estado del componente:
    const [centros, setCentros] = useState([]); //Array de centros
    const [loading, setLoading] = useState(false); //Sí está cargando y aún no ha llegado la información
    const [total, setTotal] = useState(0); //Total de registros en la API
    
    
    //useEffect() => Es un hook que sirve para ejecutar código después de que el componente se renderiza
    // Es decir, hace cosas extra una vez que la UI ya está en pantalla. Ejemplos: llamadas a APIS con fetch.
    //Ejemplos: https://www.w3schools.com/react/react_useeffect.asp

    //En este caso concreto se ejecuta en el primer render y cada vez que cambia una de las dependencias (provincias, page o pageSize)

    useEffect(() => { 
      async function fetchCentros(){
        try {
          //Se empiezan a intentar cargar (se inicializa loading a true)
          setLoading(true);
          const provinciaCodificada = encodeURIComponent(provincia);
          const offset = (page - 1) * pageSize;
          //Si se pone pageSize mayor que 100 fallará (restricción de la API de JCYL)
          //Si provincia está en blanco no filtra por provincia
          const url = (provincia === "")
            ? `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/directorio-de-centros-docentes/records?limit=${pageSize}&offset=${offset}` 
            : `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/directorio-de-centros-docentes/records?where=provincia%20%3D%20%22${provinciaCodificada}%22&limit=${pageSize}&offset=${offset}`;

          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          setTotal(datos.total_count); //Estos son todos los registros que se han encontrado
          setCentros(datos.results || []); //Si datos.results es falso, null o undefined se pondrá un array vacío [].
          
        } catch (error) {
            console.error(error);
            setCentros([]); //Si hay error se ponen los centros vacíos

        } finally {
            setLoading(false); //Se ejecuta siempre al final, para que deje de mostrar la animación de carga
        }
      };
      
      fetchCentros();
    }, [provincia, page, pageSize]);
    return { centros, loading, total};
}