import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {SERVER_URL} from "./consts";
import CarList from "./CarList";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            open: false
        }
    }

    handleClose = (event, reason) => {
        this.setState({open: false})
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    login = () => {
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        fetch(SERVER_URL + 'login',
            {
                method: 'POST',
                body: JSON.stringify(user)
            })
            .then(response => {
                const jwtToken = response.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({isAuthenticated: true})
                } else {
                    this.setState({open: true})
                }
            })
            .catch(err => console.error(err))
    };

    render() {
        if (this.state.isAuthenticated === true) {
            return (<CarList/>);
        } else {
            return (
                <div>
                    <TextField name="username"
                               placeholder="Username"
                               onChange={this.handleChange}/><br/>
                    <TextField name="password"
                               placeholder="Password"
                               onChange={this.handleChange}/><br/><br/>
                    <Button variant="raised" color="primary" onClick={this.login}>Login</Button>
                    <Snackbar open={this.state.open}
                              onClose={this.handleClose}
                              autoHideDuration={1500}
                              message='Check your username and password'/>
                </div>
            );
        }
    }
}

export default Login;