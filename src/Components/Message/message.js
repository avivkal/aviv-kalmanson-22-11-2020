import React from 'react'
import './message.scss'
import PropTypes from 'prop-types';
import { Button, Container, Alert, Row, Col } from 'react-bootstrap';

const message = (props) => {
    const { sender, subject } = props.messageContent;
    return (
        <Alert variant="dark">
            <Container fluid>
                <Row className="message-container text-style" onClick={props.openMail}>
                    <Col lg={4} className="details-style">From: {sender}</Col>
                    <Col lg={4} className="details-style">{subject} </Col>
                    <Col lg={{ span: 2, offset: 10 }}>
                        <Button onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            props.delete()
                        }} variant="dark" className="button-style">Delete</Button>
                    </Col>
                </Row>
            </Container>
        </Alert>

    );
}

message.propTypes = {
    openMail: PropTypes.func,
    delete: PropTypes.func,
};

export default message;