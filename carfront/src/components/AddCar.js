import React, {Component} from 'react';
import SkyLight from 'react-skylight';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            model: '',
            year: '',
            color: '',
            price: ''
        };
        this.addDialog = React.createRef();

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var newCar = {
            brand: this.state.brand,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price
        };
        this.props.addCar(newCar);
        this.refs.addDialog.hide();

    };

    cancelSubmit = () => {
    };

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={this.addDialog}>
                    <h3>New car</h3>
                    <form>
                        <TextField label="Brand" placeholder="Brand" name="brand" onChange={this.handleChange}/><br/>
                        <TextField label="Model" placeholder="Model" name="model" onChange={this.handleChange}/><br/>
                        <TextField label="Year"  placeholder="Year"  name="year"  onChange={this.handleChange}/><br/>
                        <TextField label="Color" placeholder="Color" name="color" onChange={this.handleChange}/><br/>
                        <TextField label="Price" placeholder="Price" name="price" onChange={this.handleChange}/><br/>
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined"
                                color="secondary"
                                onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
                <div>
                    <Button variant="raised"
                            color="primary"
                            style={{'margin': '10px'}}
                            onClick={() => this.addDialog.show()}>New car</Button>
                </div>
            </div>
        );
    }
}

export default AddCar;