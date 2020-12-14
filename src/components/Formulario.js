/* este es un componente hijo, aqui es donde haremos uso del context que creamos, primeramente importamos el hook useContext */
import React, { useContext, useState } from 'react';              
/* tenemos que importar la variable que definimos como createContext de nuestro archivo context,js */
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from'../context/RecetasContext';

const Formulario = () => {
    
    /* a useContext le pasamos como valor la variable que importamos */
    /* de esta forma en las llaves podemos poner todo lo que queramos usar siempre y cuando esten disponibles en value de Context.Provider de nuestro archivo context.js */
    /*  todo lo anterior es un ejemplo, ahora empezamos a aplicarlo   
        const { hola } = useContext(CategoriasContext);

        alert(hola)
    */

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    /* state local para guardar la busqueda realizada */
    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });
    /* funcion para leer los contenidos */
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [ e.target.name ] : e.target.value
        });
    }

    return ( 
        <form 
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                /* esto es para decir que realmente hay algo que consultar */
                guardarConsultar(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Bebidas por categorio o ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input  
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >   
                        <option value="">--Selecciona Categoria--</option>
                        {/* recorreremos las categorias que trajimos de la app */}
                        {categorias.map(categoria => (
                            <option 
                                /*recorrer de etsa forma necesita un key, por lo que podemos usar el nombre como key porque no se repite */
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default Formulario;