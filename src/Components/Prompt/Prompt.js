import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as promptActions from '../../Store/Actions/promptActions'

class Prompt extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.closePrompt()}>
                <Modal.Header>
                    <Modal.Title>{this.props.promptTitle}</Modal.Title>
                </Modal.Header>
                {this.props.subjectOptional !== '' && this.props.subjectOptional !== undefined ? <Modal.Body>
                    {this.props.subjectOptional}
                </Modal.Body> : null}
                <Modal.Body>
                    {this.props.promptText}</Modal.Body>
                <Modal.Footer>
                    {this.props.isDelete ?
                        <div>
                            <Button variant="secondary" onClick={() => this.props.closePrompt()}>
                                Discard
                </Button>
                            <Button variant="secondary" onClick={() => {
                                this.props.deleteMessage();
                                this.props.closePrompt()
                            }}>
                                Delete
                </Button>
                        </div>
                        : <Button variant="secondary" onClick={() => this.props.closePrompt()}>
                            Close
                </Button>
                    }



                </Modal.Footer>
            </Modal>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        show: state.prompt.show,
        promptTitle: state.prompt.promptTitle,
        promptText: state.prompt.promptText,
        subjectOptional: state.prompt.subjectOptional,
        isDelete: state.prompt.isDelete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closePrompt: () => dispatch(promptActions.closePrompt()),
        deleteMessage: () => dispatch(promptActions.deleteMessage()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Prompt);
