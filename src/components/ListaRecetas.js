import React, { useContext } from 'react';
import Receta from './Receta';
import { RecetasContext } from '../context/RecetasContext';

const ListaRecetas = () => {
    
    //extraer las recetas
    const { recetas } = useContext(RecetasContext);
    console.log(recetas);


    return ( 
        /* esto de las recetas se pasara por props, pues como queremos iterar cada uno es neceario hacer essta accion
            por ello creamos un componente receta al cual le pasaremos las propiedades que obtenemos de la api
        */
        <div className="row mt-5">
            {recetas.map(receta =>(
                <Receta
                    key={receta.idDrink}
                    receta={receta}
                />
            ))}
        </div>
    );
}
 
export default ListaRecetas;