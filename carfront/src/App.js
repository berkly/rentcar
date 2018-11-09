import React, {Component} from 'react';
import CarList from "./components/CarList";
import './App.css';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Login from "./components/Login";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppBar position="static" color="default">
                    <Toolbar><CarList/></Toolbar>
                </AppBar>
                <Login/>
            </div>
        );
    }
}

export default App;