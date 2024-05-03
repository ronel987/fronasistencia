import React, {Component} from 'react';
import CompCabecera from './CompCabecera';
import CompPiePagina from './CompPiePagina';
import CompImagen from './CompImagen';
import CompMenu from './CompMenu';

class PageInicio extends Component {

  render(){
    return  <div >
                <CompCabecera />
                <main role="main" className="container">      
                    <div className="row">
                        <div className="col-2">
                            <CompMenu />                            
                        </div>
                        <div className="col-10">
                             <CompImagen />
                        </div>  
                    </div>
                </main>
                <CompPiePagina />
            </div>
  }
}

export default PageInicio;