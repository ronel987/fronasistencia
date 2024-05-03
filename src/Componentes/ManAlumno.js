import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "https://apiasistencia1.azurewebsites.net/api/alumno/";
//modal:var q activan los 2 modales
//tipoModal: define con q tipo me encuentro
class ManAlumno extends Component {
    state = {
        lista: [],
        modalInsertar: false,
        modalEliminar: false,
        datos: {
            aluid: '',
            aluestado: true,
            dni: '',
            fecharegistro: '',
            apellidomat: '',
            apellidopat: '',
            direccion: '',
            genero: true,
            nombres: ''
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

    metodoPost = async () => {
        delete this.state.datos.aluid;
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
        fetch(url + this.state.datos.aluid, {
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
        fetch(url + this.state.datos.aluid, {
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

    seleccionarDatos = (alumno) => {    //seleccionar la fila de la tabla
        this.setState({
            tipoModal: 'actualizar',
            datos: {
                aluid: alumno.aluid,
                aluestado: alumno.aluestado,
                dni: alumno.dni,
                fecharegistro: alumno.fecharegistro,
                apellidomat: alumno.apellidomat,
                apellidopat: alumno.apellidopat,
                direccion: alumno.direccion,
                genero: alumno.genero,
                nombres: alumno.nombres
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
                    >Agregar Alumno</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr><th>Dni</th><th>Estado</th><th>Nombres</th><th>Ape. Pat.</th><th>Ape. Mat.</th>
                                <th>Mantenimiento</th></tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(alumno => {
                                    return (
                                        <tr key={alumno.aluid}>
                                            <td>{alumno.dni}</td>
                                            <td>{alumno.aluestado ? 'Activo' : 'Inactivo'}</td>
                                            <td>{alumno.nombres}</td>
                                            <td>{alumno.apellidopat}</td>
                                            <td>{alumno.apellidomat}</td>                                                                                   
                                            <td>
                                                <button className="btn btn-secondary"
                                                    onClick={() => {
                                                        this.seleccionarDatos(alumno);
                                                        this.modalInsertar()
                                                    }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {" "}
                                                <button className="btn btn-danger"
                                                    onClick={() => {
                                                        this.seleccionarDatos(alumno);
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
                                    <input className="form-control" type="text" name="aluid" id="aluid" readOnly
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.aluid : ''}></input><br />                                    
                                    <label htmlFor="estado">Estado (true o false):</label>
                                    <select className="form-control" name="aluestado" id="aluestado"  defaultValue={datos ? datos.aluestado :true} >
                                         <option value="true">Activo</option>
                                         <option value="false">Inactivo</option>
                                   </select>                                           
                                    <label htmlFor="nombres">Nombres:</label>
                                    <input className="form-control" type="text" name="nombres" id="nombres"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.nombres : ''}></input><br />
                                    <label htmlFor="paterno">Apellido Paterno:</label>
                                    <input className="form-control" type="text" name="apellidopat" id="apellidopat"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.apellidopat : ''}></input>
                                    <label htmlFor="materno">Apellido Materno:</label>
                                    <input className="form-control" type="text" name="apellidomat" id="apellidomat"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.apellidomat : ''}></input>
                                    <label htmlFor="dni">Dni:</label>
                                    <input className="form-control" type="text" name="dni" id="dni"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.dni : ''}></input>
                                    <label htmlFor="genero">Genero (true o false):</label>
                        <select className="form-control" name="genero" id="genero" defaultValue={datos ? datos.genero:true} >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                       </select>                                    
                                    <label htmlFor="direccion">Dirección:</label>
                                    <input className="form-control" type="text" name="direccion" id="direccion"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.direccion : ''}></input>
                                    <label htmlFor="fecharegistro">Fecha de Registro:</label>
                                    <input className="form-control" type="text" name="fecharegistro" id="fecharegistro"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.fecharegistro : ''}></input>

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
                                Desea Eliminar el Alumno {datos && datos.nombres && datos.apellidopat} ?
                                No Podrás Eliminar Alumnos cuyos id esten en AsistenciaAlu!!!
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
export default ManAlumno;