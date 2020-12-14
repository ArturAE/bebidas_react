import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//crear context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [ idreceta, guardarIdReceta ] = useState(null);
    const [ inforeceta, guardarReceta ] = useState({});

    //una vez que tenemos una receta, llamr a la api
    useEffect(() => {
        const obtenerRecetaAPI = async () => {
            //si no hay idreceta no ejecutes nada
            if(!idreceta) return;
            
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(url);

            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerRecetaAPI();
    }, [idreceta]);/* pasmos el id ya que queremos que se mande llmar a ala api cada que este cambie */

    return ( 
        <ModalContext.Provider
            value={{
                inforeceta,
                guardarIdReceta,
                /* hacemos la siguiente funcion disponible en todos los componentes */
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default ModalProvider;