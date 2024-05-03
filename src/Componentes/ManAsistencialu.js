import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "https://apiasistencia1.azurewebsites.net/api/asistenciaalu/";
const alus = "https://apiasistencia1.azurewebsites.net/api/alumno/";
const docs = "https://apiasistencia1.azurewebsites.net/api/docente/";
//modal:var q activan los 2 modales
//tipoModal: define con q tipo me encuentro
class ManAsistencialu extends Component {
    state = {
        lista: [],
        alumnos: [],
        docentes: [],
        modalInsertar: false,
        modalEliminar: false,
        datos: {
            fecid: '',
            fecano: '',         
            marcacion: '',
            docid: 0,
            aluid: 0,         
            fecestado: 'true'
        },
        tipoModal: ''
    }
    obtenerAlumnos = () => {
        fetch(alus)       //obtiene la lista
            .then(response => {
                return response.json();
            })
            .then(alumnos => {
                this.setState({  //setea la lista
                    alumnos
                })
            });            
    }
    obtenerDocentes = () => {
        fetch(docs)       //obtiene la lista
            .then(response => {
                return response.json();
            })
            .then(docentes => {
                this.setState({  //setea la lista
                    docentes
                })
            });            
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

    metodoPost = async () => {
        delete this.state.datos.fecid;        
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(this.state.datos),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => {
                this.modalInsertar();
                this.metodoGet();
            }).catch(error => {
                console.log(error.message);
            })
    }

    metodoPut = () => {
        fetch(url + this.state.datos.fecid, {
            method: "PUT",
            body: JSON.stringify(this.state.datos),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => {
                this.modalInsertar();
                this.metodoGet();
            }).catch(error => {
                console.log(error.message);
            })
    }

    metodoDelete = () => {
        fetch(url + this.state.datos.fecid, {
            method: "DELETE"
        })
            .then(response => {
                this.setState({
                    modalEliminar: false
                });
                this.metodoGet();
            }).catch(error => {
                console.log(error.message);
            })
    }
   //actualiza la var pa q se muestre u oculte el modal
    modalInsertar = () => {
        this.setState({
            modalInsertar: !this.state.modalInsertar
        });
    }

    seleccionarDatos = (asisalu) => {    //seleccionar la fila de la tabla
        this.setState({
            tipoModal: 'actualizar',
            datos: {
                fecid: asisalu.fecid,
                fecano: asisalu.fecano,
                marcacion: asisalu.marcacion,
                docid: asisalu.docid,
                aluid: asisalu.aluid,
                fecestado: asisalu.fecestado
            }
        });
    }

    cargarDatos = async e => {    //viene del onChange:actualiza valores
        await this.setState({
            datos: {
                ...this.state.datos, [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount() {
        this.metodoGet();
        this.obtenerAlumnos();
        this.obtenerDocentes();
    }
   //AgregarAlumno llamara al Modal
    render() {
        const { datos } = this.state;
        return (
            <main role="main" className="container">
                <div className="row">
                    <button className="btn btn-success mb-3"
                        onClick={() => {
                            this.setState({ datos: null, tipoModal: 'insertar' });
                            this.modalInsertar()
                        }}
                    >Agregar Asistencia</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr><th>Docente</th><th>Alumno</th><th>Fecha</th><th>Marcación</th><th>Estado</th>
                                <th>Mantenimiento</th></tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(asisalu => {
                                    return (
                                        <tr>
                                            <td>{asisalu.docid}</td>
                                            <td>{asisalu.aluid }</td>
                                            <td>{asisalu.fecano}</td>
                                            <td>{asisalu.marcacion}</td>
                                            <td>{asisalu.fecestado ? 'Activo' : 'Inactivo'}</td>                                                                                   
                                            <td>
                                                <button className="btn btn-secondary"
                                                    onClick={() => {
                                                        this.seleccionarDatos(asisalu);
                                                        this.modalInsertar()
                                                    }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {" "}
                                                <button className="btn btn-danger"
                                                    onClick={() => {
                                                        this.seleccionarDatos(asisalu);
                                                        this.setState({ modalEliminar: true })
                                                    }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                          
                        <Modal isOpen={this.state.modalInsertar}>    
                            <ModalHeader style={{ display: 'block' }}>
                                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>X</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                <label htmlFor="fecid">ID</label>
                                    <input className="form-control" type="text" name="fecid" id="fecid" readOnly
                                        onChange={this.cargarDatos}  value={datos ? datos.fecid :''}></input><br />    

                                    <label htmlFor="docid">Docente</label>
                                    <select className="form-control"  name="docid" id="docid" 
                                        onChange={this.cargarDatos}  value={datos ? datos.docid : 0}>
                                    <option value="">
                                            --Docente Selecciona tu Dni--
                                        </option>
                                     {this.state.docentes.map(docente => (
                                        <option key={docente.docid} value={docente.docid}>{docente.dni}</option> )
                                    )}

                                    </select><br />   

                                    <label htmlFor="aluid">Alumno</label>
                                    <select className="form-control"  name="aluid" id="aluid" 
                                        onChange={this.cargarDatos}  value={datos ? datos.aluid : 0}>
                                    <option value="">
                                            --Selecciona Alumno--
                                        </option>
                                      {this.state.alumnos.map(alumno => (
                                         <option key={alumno.aluid} value={alumno.aluid}> {alumno.nombres} {
                                             alumno.apellidopat} {alumno.apellidomat}
                                         </option> )
                                       )}
                                    </select><br /> 

                                     <label htmlFor="fecano">Fecha del Año:</label>
                                    <input className="form-control" type="text" name="fecano" id="fecano"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.fecano : ''}></input>

                                    <label htmlFor="fecestado">Estado de la Fecha:</label>
                                    <select className="form-control" type="text" name="fecestado" id="fecestado"
                                        onChange={this.cargarDatos}  value={datos ? datos.fecestado : 'true'}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select><br/>                                  
                                    <label htmlFor="marcacion">Marcación:</label>
                                    <select className="form-control"  name="marcacion" id="marcacion"
                                        onChange={this.cargarDatos}  value={datos ? datos.marcacion : ''}>
                                            <option value="ASISTIO">ASISTIO</option>
                                            <option value="FALTA">FALTA</option>
                                            <option value="TARDE">TARDE</option>
                                    </select>                                                             

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {this.state.tipoModal == "insertar" ?
                                    <button className="btn btn-success" onClick={() => this.metodoPost()}>
                                        Insertar
                                    </button> : <button className="btn btn-danger" onClick={() => this.metodoPut()}>
                                        Actualizar
                                    </button>
                                }
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modalEliminar}>
                            <ModalBody>
                                Desea Eliminar la Asistencia del Alumno con Id: {datos && datos.aluid} ?                                
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-danger" onClick={() => this.metodoDelete()}>
                                    Aceptar
                                </button>
                                <button className="btn btn-secondary" onClick={() => this.setState({modalEliminar: false})}>
                                    Cancelar
                                </button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </main>
        );
    }
}
//en un solo modal hizo la insercion y actualizacion
export default ManAsistencialu;