import React, { Component } from 'react';


const url = "https://apiasistencia1.azurewebsites.net/api/horariodoc/";
//modal:var q activan los 2 modales
//tipoModal: define con q tipo me encuentro
class ManAlumno extends Component {
    state = {
        lista: [],       
        datos: {
            hcid: '',
            hcdia: '',                      
            hchoraini: '',
            hchorafin: '',
            curid: '',
            docid: ''
        }       
    }

    metodoGet = () => {
        fetch(url)       //obtiene la lista
            .then(response => {
                return response.json();
            })
            .then(lista => {
                this.setState({  //setea la lista
                    lista
                })
            });
            
    }   

    componentDidMount() {
        this.metodoGet();
    }
   
    render() {
        const { datos } = this.state;
        return (
            <main role="main" className="container">
                
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr><th>ID</th><th>Día</th><th>Hora Inicio</th><th>Hora Fin</th><th>Curso</th><th>Docente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(horario => {
                                    return (
                                        <tr>
                                            <td>{horario.hcid}</td>
                                            <td>{horario.hcdia }</td>
                                            <td>{horario.hchoraini}</td>
                                            <td>{horario.hchorafin}</td>
                                            <td>{horario.curid}</td>                                                                                   
                                            <td>{horario.docid}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>                                               
                       
                    </div>
                </div>
            </main>
        );
    }
}

export default ManAlumno;