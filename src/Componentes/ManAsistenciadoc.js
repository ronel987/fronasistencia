import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "https://apiasistencia1.azurewebsites.net/api/asistenciadoc/";
const hor = "https://apiasistencia1.azurewebsites.net/api/horariodoc/";
//modal:var q activan los 2 modales
//tipoModal: define con q tipo me encuentro
class ManAsistenciadoc extends Component {
    state = {
        horarios: [],
        lista: [],
        modalInsertar: false,
        modalEliminar: false,
        datos: {
            fdpid: '',
            fdpestado: 'true',
            fdpfecha: '',
            hcid: '',
            asmarca: 'false',
            marcamomento: ''
        },
        tipoModal: ''
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

    obtenerHorarios = () => {
        fetch(hor)       //obtiene horarios
            .then(response => {
                return response.json();
            })
            .then(horarios => {
                this.setState({  //setea la lista
                    horarios
                })
            });            
    }

    metodoPost = async () => {
        delete this.state.datos.fdpid;
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
        fetch(url + this.state.datos.fdpid, {
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
        fetch(url + this.state.datos.fdpid, {
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

    seleccionarDatos = (asistenciadoc) => {    //seleccionar la fila de la tabla
        this.setState({
            tipoModal: 'actualizar',
            datos: {
                fdpid: asistenciadoc.fdpid,
                fdpestado: asistenciadoc.fdpestado,
                fdpfecha: asistenciadoc.fdpfecha,
                hcid: asistenciadoc.hcid,
                asmarca: asistenciadoc.asmarca,
                marcamomento: asistenciadoc.marcamomento
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
        this.obtenerHorarios();
    }
   //AgregarAsistencia llamara al Modal
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
                                <tr><th>Estado</th><th>Fecha</th><th>Horario</th><th>Inicio</th><th>Marca</th><th>Fecha y Hora Marcada</th><th>Mantenimiento</th></tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(asistenciadoc => {
                                    return (
                                        <tr>
                                            <td>{asistenciadoc.fdpestado ? 'Activo' : 'Inactivo'}</td>
                                            <td>{asistenciadoc.fdpfecha.substring(0,10)}</td>
                                            <td>{asistenciadoc.hcid}</td>  
                                            <td>{
                                                 (this.state.horarios.
                                                  filter(horario => horario.hcid=== asistenciadoc.hcid))[0].hchoraini
                                                }                                                
                                            </td>
                                            <td>{asistenciadoc.asmarca ? 'ASISTIO':'FALTO'}</td>
                                            <td>{asistenciadoc.marcamomento}</td>                                           
                                            <td>
                                                <button className="btn btn-secondary"
                                                    onClick={() => {
                                                        this.seleccionarDatos(asistenciadoc);
                                                        this.modalInsertar()
                                                    }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {" "}
                                                <button className="btn btn-danger"
                                                    onClick={() => {
                                                        this.seleccionarDatos(asistenciadoc);
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

                                    <label htmlFor="id">ID</label>
                                    <input className="form-control" type="text" name="fdpid" id="fdpid" readOnly
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.fdpid : ''}></input><br />
                                    
                                    <label htmlFor="estado">Estado (true o false):</label>   
                                    <input className="form-control" type="text" name="fdpestado" id="fdpestado"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.fdpestado : ''}></input>                                    

                                    <label htmlFor="fecha">Fecha:</label>
                                    <input className="form-control" type="text" name="fdpfecha" id="fdpfecha"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.fdpfecha : ''}></input><br />

                                    <label htmlFor="horario">Horario:</label>                                      
                                    <select className="form-control"  name="hcid" id="hcid" 
                                        onChange={this.cargarDatos}  value={datos ? datos.hcid : 0}>
                                    <option value="">
                                            --Selecciona un Horario--
                                        </option>
                                     {this.state.horarios.map(horario => (
                                        <option key={horario.hcid} value={horario.hcid}>{horario.hcdia} de {
                                        horario.hchoraini} a {horario.hchorafin}</option> )
                                    )}
                                    </select><br />   

                                    <label htmlFor="marca">Marca:</label>                               
                                       
                                    <select className="form-control"  name="asmarca" id="asmarca"
                                        onChange={this.cargarDatos}  value={datos ? datos.asmarca : ''}>
                                            <option value="True">ASISTIO</option>
                                            <option value="False">FALTA</option>
                                           
                                    </select>                       
                                    <label htmlFor="momento">Momento:</label>
                                    <input className="form-control" type="text" name="marcamomento" id="marcamomento"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.marcamomento : ''}></input>
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
                                Desea Eliminar la Asistencia {datos && datos.fdpid} ?                                
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
export default ManAsistenciadoc;