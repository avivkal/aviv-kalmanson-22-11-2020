import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as promptActions from '../../Store/Actions/promptActions'
import { Form, Button, Container, Toast } from 'react-bootstrap';
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import './messageForm.scss'
import { Spinner } from 'react-bootstrap';

class MessageForm extends Component {
    state = {
        message: '',
        receiver: '',
        subject: '',
    }

    componentDidMount = () => {
        if (!this.props.loggedIn) {
            if (getCurrentUser()) {
                this.props.updateCurrentUser(getCurrentUser())
                this.props.setLoggedIn()
            }
            else {
                this.props.history.push(LOGIN_PATH)
            }
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.props.loggedIn) {
            await this.props.sendMessage(this.state.receiver, this.state.subject, this.state.message);
            if (this.props.showSuccess) {
                this.setState({
                    message: '',
                    receiver: '',
                    subject: '',
                })
            }

        }
    }

    render() {
        if (this.props.loading)
            return <Spinner animation="border" className="spinner" />
        return (
            <div>
                <Toast show={this.props.showSuccess} onClose={() => this.props.toggleSuccess()}>
                    <Toast.Header>
                        <strong className="mr-auto">Success</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>Message was sent successfully!</Toast.Body>
                </Toast>

                <Container className="form app-background header-style">
                    <h1>Send Message</h1>

                    <Form onSubmit={(e) => this.handleSubmit(e)} >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>From:</Form.Label>
                            <Form.Control type="email" disabled value={this.props.currentUser.email} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>To:</Form.Label>
                            <Form.Control type="text" name="receiver" onChange={(e) => this.handleChange(e)} value={this.state.receiver} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control type="text" name="subject" onChange={(e) => this.handleChange(e)} value={this.state.subject} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Message:</Form.Label>
                            <Form.Control type="text" name="message" onChange={(e) => this.handleChange(e)} value={this.state.message} />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
</Button>
                    </Form>

                </Container>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.main.currentUser,
        loggedIn: state.main.loggedIn,
        showSuccess: state.prompt.showSuccess,
        loading: state.loading.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentUser: (user) => dispatch(mainActions.updateUsername(user)),
        sendMessage: (receiver, subject, message) => dispatch(mainActions.sendMessage(receiver, subject, message)),
        toggleSuccess: () => dispatch(promptActions.toggleSuccess()),
        setLoggedIn: () => dispatch(mainActions.loggedIn())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
