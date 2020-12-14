/* Al usar contextapi LOS ESTADOS O props ya no pasan del padre de uno en uno, sino que desde el
padre puedes psar los estados directamente
ej: antes 
de app a tienda, de tienda a productos y de productos a producto
app a tienda  a  productos a producto
ej: ahora
app a tienda, app a productos, app a producto
app  tienda   productos     producto
*/
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
//crear el Context
export const CategoriasContext = createContext();

//crear provider, es donde se enucnetran las funciones y state
//los props van porque se tiene que hacer referencia a los componentes hijos con props.children
const CategoriasProvider = (props) => {
    
    //crear state del context
    /* esto es un ejemplo, solo es necesario aqui en este archivo y en formulario, const [ hola, guardarHola ] = useState('hola desde state'); */
    
    //inicia como arreglo vacio parque se guardara la categoria
    const [ categorias, guardarCategorias ] = useState([]);

    //ejecutar el llamado a la api, INSTALAMOS AXIOS PARA FACILITAR EL USO DE LA API  npm i axios
    useEffect(() => {
        const obtenerCategoriasAPI = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks)
        }
        obtenerCategoriasAPI();
    }, [])

    //en return es todo lo que mostraras o haras en si
    return(
        /* usamos nuestra referencia al context usando la sintaxis como si fuera componente */
        <CategoriasContext.Provider
            /* aqui tenemos que pasar siempre como value los valores que estaran disponibles en los demas componentes */
            /* esto es parte del ejemplo
                value={{
                    hola,
                    guardarHola
                }} 
            */
           value={{
               /* pasamos la variable categorias en el value para poder ser usadas */
               categorias
           }}
        >
            {/* aqui es donde usamos el props, de esta manera los distinto componentes, por ejemplo los de arriba de ejemplo estaran dentro de props.children 
            de esta forma se pasaran los datos
            */}
            {props.children}
        </CategoriasContext.Provider>
    );
}
/* ponemos un export default a la funcion que creamos para hacerlo disponible en los demas componentes */
export default CategoriasProvider;