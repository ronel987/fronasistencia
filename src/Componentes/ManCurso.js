import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "https://apiasistencia1.azurewebsites.net/api/curso/";
//la definicion inicial del state es referencial,los tipos pueden cambiar
//tipoModal: define con q tipo me encuentro
class ManCurso extends Component {
    state = {
        lista: [],
        modalInsertar: false,
        modalEliminar: false,
        datos: {
            curid: '',
            curestado: 'true',
            curnombre: '',
            grdid: 1,
            Grd:{
                grdid: 4,
            grdestado:false,
            grdnombre:"4to grado",
            aeid:1,
            ae:{
                 "aeid":1,
               "aenombre":"2024",
               "aeestado":true,
               "aefecfin":"2024-02-21",
               "aefecini":"2024-12-16"
            }
            }
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
        delete this.state.datos.curid;
        //toy forsando valores fijos
        this.state.datos.curestado=true;
        this.state.datos.grdid=4;
        this.state.datos.Grd={
            "grdid": 4,
            "grdestado":false,
            "grdnombre":"4to grado",
            "aeid":1,
            "ae":{
                 "aeid":1,
               "aenombre":"2024",
               "aeestado":true,
               "aefecfin":"2024-02-21",
               "aefecini":"2024-12-16"
            }
        };
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
        fetch(url + this.state.datos.curid, {
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
        fetch(url + this.state.datos.curid, {
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

    seleccionarDatos = (curso) => {    //seleccionar la fila de la tabla
        this.setState({
            tipoModal: 'actualizar',
            datos: {
                curid: curso.curid,
                curestado: curso.curestado,
                curnombre: curso.curnombre,
                grdid: curso.grdid
            }
        });
    }

    cargarDatos = async e => {    //viene del onChange:actualiza valores desde la iu,para poder ser enviados en post,put
        await this.setState({
            datos: {
                ...this.state.datos, [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount() {
        this.metodoGet();
    }
   //AgregarCategoria llamara al Modal
    render() {
        const { datos } = this.state;
        return (
            <main role="main" className="container">
                <div className="row">
                    <button className="btn btn-success mb-4"
                        onClick={() => {
                            this.setState({ datos: null, tipoModal: 'insertar' });
                            this.modalInsertar()
                        }}
                    >Agregar Curso</button>
                </div>
                <div className="row">
                    <div className="col-9">
                        <table className="table">
                            <thead>
                                <tr><th>ID</th><th>Estado</th><th>Nombre</th><th>Grado</th><th>Mantenimiento</th></tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(curso => {
                                    return (
                                        <tr key={curso.curid}>
                                            <td>{curso.curid}</td>
                                            <td>{curso.curestado ? 'Activo' : 'Inactivo'}</td>
                                            <td>{curso.curnombre}</td>
                                            <td>{curso.grdid}</td>                                            
                                            <td>
                                                <button className="btn btn-secondary"
                                                    onClick={() => {
                                                        this.seleccionarDatos(curso);
                                                        this.modalInsertar()
                                                    }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {" "}
                                                <button className="btn btn-danger"
                                                    onClick={() => {
                                                        this.seleccionarDatos(curso);
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
                                    <input className="form-control" type="text" name="curid" id="curid" readOnly
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.curid : ''}></input><br />
                                    
                                    <label htmlFor="estado">Estado (true o false):</label>
                                    <select className="form-control" name="curestado" id="curestado"  value={datos ? 'true' :'false'} readOnly  >
                                         <option value="true">Activo</option>
                                         <option value="false">Inactivo</option>
                                   </select>                                    

                                    <label htmlFor="curnombre">Nombre:</label>
                                    <input className="form-control" type="text" name="curnombre" id="curnombre"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.curnombre : ''}></input><br />

                                    <label htmlFor="grado">Grado:</label>
                                    <select className="form-control" name="grdid" id="grdid"  defaultValue={datos ? datos.grdid :1} onChange={this.cargarDatos} >
                                         <option value={1} >1er Grado</option>
                                         <option value={2} >2do Grado</option>
                                         <option value={3} >3er Grado</option>
                                         <option value={4} >4to Grado</option>
                                         <option value={5} >5to Grado</option>
                                         <option value={6} >6to Grado</option>
                                   </select>   
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {this.state.tipoModal == "insertar" ?
                                    <button className="btn btn-seccuess" onClick={() => this.metodoPost()}>
                                        Insertar
                                    </button> : <button className="btn btn-danger" onClick={() => this.metodoPut()}>
                                        Actualizar
                                    </button>
                                }
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modalEliminar}>
                            <ModalBody>
                                Desea Eliminar el Curso {datos && datos.curnombre} ?
                                No Podrás Eliminar Cursos cuyos id esten en CursoDocente!!!
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
export default ManCurso;