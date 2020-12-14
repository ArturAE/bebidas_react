import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';

/* importamos el context creado anteriormente */
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          {/* se sustituyen los fragment por nuestro context, de esta forma lo que tenemos en el context provide rcreado estara disponible en el padre y
            podremos pasarlo a los hijos que son los que estan dentro del provider que es el header, formulario, etc
          */}
          {/* <Fragment> */}
          <Header />

          <div className="container mt-5">
            <div className="row">
              <Formulario />
            </div>

            <ListaRecetas />
          </div>
          {/* </Fragment>  */}
        </ModalProvider>
      </RecetasProvider>
   </CategoriasProvider>
  );
}

export default App;
