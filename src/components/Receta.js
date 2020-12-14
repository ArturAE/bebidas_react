import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
/* instalar esto npm i @material-ui/core */
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //configuracion de l modal de material-ui
    const [ modalStyle ] = useState(getModalStyle);
    //para abrir y cerrar modal
    const [ open, setOpen ] = useState(false);

    //para usar el useStyles hay que crear unas clases
    const classes = useStyles();
    //para abrir el modal
    const handleOpen = () => {
        setOpen(true);
    }
    //para cerrar el modal
    const handleClose = () => {
        setOpen(false);
    }



    //extraer valores del context, al pasar inforeceta podemos sacar valores de la receta sellecionada y agregarlos al modal
    const { inforeceta, guardarIdReceta, guardarReceta } = useContext(ModalContext);
    

    //muestra y formatea los ingredientes
    const mostrarIngredientes = inforeceta => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            /* como en la api hay muchos ingredientes en null hacemos esto
                en caso de que no sea null, agrega los ingredientes
            */
            if( inforeceta[`strIngredient${i}`] ){
                ingredientes.push(
                    /* esto seria que mapee ingrediente 1 con la cantidad 1 y asi sucesivamente */
                    <li>{inforeceta[`strIngredient${i}`]} {inforeceta[`strMeasure${i}`]} </li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            //cuando se haga clic el modal se abrira
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    {/* agregar modal */}
                    <Modal
                        open={open}
                        onClose={() => {
                            /* con esto el state vuelve a null cuando ya salimos del modal */
                            guardarIdReceta(null);
                            guardarReceta({});/* esto hace que la receta sea un objeto vacio una vez que se cierre el modal */
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{inforeceta.strDrink}</h2>
                            <img className="img-fluid my-4" src={inforeceta.strDrinkThumb} />
                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {/* aqui se debera mostrar el array */}
                                { mostrarIngredientes(inforeceta) }
                            </ul>
                            <h3 className="mt-4">Instrucciones de preparación</h3>
                            <p>{inforeceta.strInstructions}</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Receta;