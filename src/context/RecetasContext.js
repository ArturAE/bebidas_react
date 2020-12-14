import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasPrivider = (props) => {

    const [ recetas, guardarRecetas ] = useState([]);
    const [ busqueda, buscarRecetas ] = useState({
        nombre: '',
        categoria: ''
    });

    /* este state es para realmente validar que hay una consulta */
    const [ consultar, guardarConsultar ] = useState(false);

    const { nombre, categoria } = busqueda;

    useEffect(() => {
        /* se crea este condificonal para validar que realmente hay una consulta */
        if(consultar){
            const obtenerRecetasAPI = async() => {
                /* ingrediente + categoria, no esta en si la api junta pero si hacemos ambas peticiones funciona */
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                
                const resultado = await axios.get(url);

                //console.log(resultado.data.drinks)
                /* guardar los datos que obtenemos */
                guardarRecetas(resultado.data.drinks);
            } 
            obtenerRecetasAPI();
        }

    }, [busqueda]);/* pasamos como dependencia la busqueda pues cuando este cambie se volvera a ejecutar */

    return ( 

        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}
 
export default RecetasPrivider;