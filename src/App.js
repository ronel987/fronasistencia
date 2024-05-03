import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import PageAlumno from './Componentes/PageAlumno';
import PageDocente from './Componentes/PageDocente';
import PageHorarios from './Componentes/PageHorarios';
import PageInicio from './Componentes/PageInicio';
import PageCurso from './Componentes/PageCurso';
import PageAsistencialu from './Componentes/PageAsistencialu';
import PageAsistenciadoc from './Componentes/PageAsistenciadoc';

class App extends Component {

  render(){
    return <Router>        
        <Routes>                                      
            <Route path="/Asistenciadoc"  element={<PageAsistenciadoc/>}   /> 
             <Route path="/PageAlumno"  element={<PageAlumno/>}   /> 
             <Route path="/PageDocente"  element={<PageDocente/>}   />
             <Route path="/"  element={<PageInicio/>}   /> 
              <Route path="/PageCurso"  element={<PageCurso/>}   /> 
              <Route path="/Asistencialu"  element={<PageAsistencialu/>}   />                
              <Route path="/Horarios"  element={<PageHorarios/>}   />  
        </Routes>
    </Router>        
  }
}

export default App;
//path es el value q escribe el usu en el navegador
