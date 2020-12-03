import React, { Component } from 'react'
import * as mainActions from '../../Store/Actions/mainActions'
import { connect } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap';
import './login.scss'
import { HOME_PATH, REGISTER_PATH } from '../../Constants/const'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.logIn(this.state.email, this.state.password);
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
        <h1>Login</h1>

        <Form onSubmit={(e) => this.handleSubmit(e)} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => this.handleChange(e)} />

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
  </Button>
          <p>Dont have an account? Click <span onClick={() => this.props.history.push(REGISTER_PATH)} className="register-link">here</span> to create one.</p>
        </Form>

      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.main.currentUser,
    loggedIn: state.main.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) => dispatch(mainActions.logIn(email, password))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
