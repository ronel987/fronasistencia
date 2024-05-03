import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class CompMenu extends Component {
    render() {
        return    <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                            <Link to="/" >Inicio</Link>
                    </li>
                    <li className="list-group-item">
                            <Link to="/PageAlumno" >Alumno</Link>
                    </li>
                    <li className="list-group-item">
                            <Link to="/PageDocente" >Docente</Link>
                    </li>
                    <li className="list-group-item">
                            <Link to="/PageCurso" >Curso</Link>
                    </li>
                    <li className="list-group-item">
                            <Link to="/Asistencialu" >Asistencia Alumno</Link>
                    </li>
                    <li className="list-group-item">
                            <Link to="/Horarios" >Horarios</Link>
                    </li>                            
                    <li className="list-group-item">
                            <Link to="/Asistenciadoc" >Asistencia Docente</Link>
                    </li>                      
                </ul>
                
            </div>        
    }
}
export default CompMenu;