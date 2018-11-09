import React, {Component} from 'react';
import {SERVER_URL} from "./consts";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddCar from './AddCar';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            open: false,
            message: ''
        }
    }

    handleClose = (event, reason) => {
        this.setState({open: false});
    };

    addCar = (car) => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + '/api/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(car)
            })
            .then(response => this.getCars())
            .catch(err => console.error(err))
    };

    getCars = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + '/api/cars', {
            headers: {'Authorization': token}
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cars: data._embedded.cars
                })
            })
            .catch(err => console.error(err))
    };

    deleteCar = (link) => {
        const token = sessionStorage.getItem('jwt');
        fetch(link, {
            method: 'DELETE',
            headers: {'Authorization': token}})
            .then(response => {
                this.setState({open: true, message: 'Car deleted'});
                this.getCars();
            })
            .catch(err => {
                this.setState({open: true, message: 'Error when deleting'});
                console.error(err);
            })
    };

    updateCar = (car, link) => {
        const token = sessionStorage.getItem('jwt');
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Autorization': token
            },
            body: JSON.stringify(car)
        })
            .then(response => this.setState({open: true, message: 'Changes saved'}))
            .catch(err => this.setState({open: false, message: 'Error when saving'}))
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.cars];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHtml;
                    this.setState({cars: data})
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.cars[cellInfo.index][cellInfo.column.id]
                }}>
            </div>
        )
    };

    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure to delete',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteCar(link)
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    componentDidMount() {
        this.getCars();
    }


    render() {
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand',
                Cell: this.renderEditable
            },
            {
                Header: 'Model',
                accessor: 'model',
                Cell: this.renderEditable
            }
            ,
            {
                Header: 'Color',
                accessor: 'color',
                Cell: this.renderEditable
            },
            {
                Header: 'Year',
                accessor: 'year',
                Cell: this.renderEditable
            },
            {
                Header: 'Price',
                accessor: 'price',
                Cell: this.renderEditable
            },
            {
                id: 'savebutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value, row}) => (
                    <Button size="small"
                            variant="flat"
                            color="primary"
                            onClick={() => {
                                this.updateCar(row, value)
                            }}>Save</Button>)
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value}) => (
                    <Button size="small"
                            variant="flat"
                            color="secondary"
                            onClick={() => {
                                this.confirmDelete(value)
                            }}>Delete</Button>)
            }
        ];
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddCar addCar={this.addCar} fetchCars={this.getCars}/>
                    </Grid>
                </Grid>
                <ReactTable data={this.state.cars}
                            columns={columns}
                            filterable={true}
                />
                <Snackbar style={{width: 300, color: 'green'}}
                          open={this.state.open}
                          onClose={this.handleClose}
                          autoHideDuration={1500}
                          message={this.state.message}/>
            </div>
        );
    }
}

export default CarList;