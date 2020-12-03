import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import './register.scss'
import * as mainActions from '../../Store/Actions/mainActions'
import { connect } from 'react-redux'
import { HOME_PATH } from '../../Constants/const'

class Register extends Component {
    state = {
        email: '',
        password: '',
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.register(this.state.email, this.state.password)
        if (this.props.loggedIn) {
            this.props.history.push(HOME_PATH);
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <Container className="form app-background">
                <h1>Register</h1>
                <Form onSubmit={(e) => this.handleSubmit(e)} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => this.handleChange(e)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.handleChange(e)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
              </Button>
                </Form>
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.main.loggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(mainActions.register(email, password))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
