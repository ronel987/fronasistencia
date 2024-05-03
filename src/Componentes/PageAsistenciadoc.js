import React, { Component } from 'react';
import CompCabecera from './CompCabecera';
import CompMenu from './CompMenu';
import ManAsistenciadoc from './ManAsistenciadoc';
import CompPiePagina from './CompPiePagina';

class PageAsistenciadoc extends Component {
    render() {
        return <div>
                    <CompCabecera/>
            <main role="main" className="container">
                <div className="row">
                    <div className="col-2">
                        <CompMenu />
                    </div>
                    <div className="col-10">
                        <ManAsistenciadoc />
                    </div>
                </div>                                
            </main>
                <CompPiePagina />
            </div>
    }
}
export default PageAsistenciadoc;