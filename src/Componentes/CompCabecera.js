import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class CompCabecera extends Component {

  render() {
    return  <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-2">
                <div className="container">
                    <span className="float-left">
                        <Link className="navbar-brand"  to="/">
                            <img src="imagenes/logo.png" width="285" height="50" alt="" />
                        </Link>
                    </span>
                    <span className="float-right">
                        <div className="collapse navbar-collapse" id="navbarText">
                            <img src="imagenes/iniciarsesion.png" width="38" height="35" alt="" />
                            
                        </div>
                    </span>
                </div>
            </nav>
  }
}

export default CompCabecera;
