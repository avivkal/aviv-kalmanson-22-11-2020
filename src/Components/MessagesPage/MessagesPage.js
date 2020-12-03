import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import { Tab, Nav, Col, Row, Button, Form } from 'react-bootstrap';
import { getCurrentUser } from '../../UtilityFunctions/functions'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { LOGIN_PATH } from '../../Constants/const';
import './messagesPage.scss'
import * as promptActions from '../../Store/Actions/promptActions'
import MessagesList from '../MessagesList/messagesList';
import { Spinner } from 'react-bootstrap';

class MessagesPage extends Component {

  state = {
    search: '',
    messagesAll: [],
    submitText: '',
    contactsList: []
  }

  loadAll = async () => {
    this.props.updateCurrentUser(getCurrentUser())
    await this.props.getEmails();
    const contacts = this.props.userInbox.map(current => {
      return {
        key: current._id,
        value: current.sender,
        text: current.sender
      }
    });
    const filtered = contacts.filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)
    this.setState({ contactsList: filtered })

  }

  componentDidMount = async () => {
    if (!this.props.loggedIn) {
      if (getCurrentUser()) {
        this.loadAll()
        this.props.setLoggedIn()
      }
      else {
        this.props.history.push(LOGIN_PATH)
      }
    }
    else {
      this.loadAll()
    }
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    this.setState({ submitText: this.state.search })
  }

  handleDelete = (id) => {
    this.props.deletePrompt();
    this.props.deletePromptSetId(id);
    this.props.openPrompt('Are you sure you want to delete this message?', 'Please select an option');
  }
  render() {
    if (this.props.loading) {
      return <Spinner animation="border" className="spinner" />
    }
    return (
      <div className="app-background">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="app-background">
            <Col sm={3}>
              <Nav variant="pills" className="flex-column tabs-style">
                <Nav.Item>
                  <Nav.Link eventKey="first">Inbox</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Sent</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={() => this.setState({ submitText: '' })} className='form-style'>
                  <Dropdown
                    className='icon search-dropdown'
                    icon='mail'
                    button
                    floating
                    labeled
                    options={this.state.contactsList}
                    search
                    placeholder='Enter Email'
                    onChange={(event) => this.setState({
                      submitText: event.currentTarget.textContent,
                      search: event.currentTarget.textContent
                    })}
                  />
                  <Button type="submit" className="button-style-1">Clear</Button>

                </Form>
              </Col>

              <Tab.Content>
                <Tab.Pane eventKey="first">

                  <MessagesList
                    isReceiver={false}
                    messages={this.props.userInbox}
                    submitText={this.state.submitText}
                    openPrompt={(title, text, subject) => this.props.openPrompt(title, text, subject)}
                    delete={(id) => this.handleDelete(id)}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">

                  <MessagesList
                    isReceiver={true}
                    messages={this.props.userSent}
                    submitText={this.state.submitText}
                    openPrompt={(title, text, subject) => this.props.openPrompt(title, text, subject)}
                    delete={(id) => this.handleDelete(id)}
                  />

                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>

        </Tab.Container>

      </div>



    );
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.main.currentUser,
    userInbox: state.main.userInbox,
    userSent: state.main.userSent,
    loggedIn: state.main.loggedIn,
    loading: state.loading.loading

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmails: () => dispatch(mainActions.getEmails()),
    openPrompt: (title, text, subject) => dispatch(promptActions.openPrompt(title, text, subject)),
    openPromptDelete: (title, text) => dispatch(promptActions.openPromptDelete(title, text)),
    updateCurrentUser: (user) => dispatch(mainActions.updateUsername(user)),
    setLoggedIn: () => dispatch(mainActions.loggedIn()),
    deletePrompt: () => dispatch(promptActions.deletePrompt()),
    deletePromptSetId: (id) => dispatch(promptActions.deletePromptSetId(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
