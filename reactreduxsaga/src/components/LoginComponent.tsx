import { Component } from "react";
import Cookie from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import {Form, FormGroup, FormControl, Button,} from 'react-bootstrap'


interface Props{

}

interface State{
    username: string;
    password: string;
}

class LoginComponent extends Component<Props, any>{
    constructor (props: Props){
        super(props);
        this.state = {
            username: "",
            password: ""

        };
    }

    validateForm(){
        return this.state.username.length > 0 && this.state.password.length >0;
    }

    changeHandler = (event: any) =>{
       this.setState({
           [event.target.id]: event.target.value
       });
    }

    submitHandler = (event: any) => {
        event.preventDefault();

        const cookies = new Cookie();

        cookies.set('logged in', this.state.username, {path: '/'});

        this.setState({
            redirect: true
        });
    }

    redirectRender(){
        if (this.state.redirect){
            return <Redirect to='/' />
        }
    }

    render(){
        return(
            <div className = "Login">
                {this.redirectRender()}
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginComponent;