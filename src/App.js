import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './Components/NavigationBar/NavigationBar'
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH, MESSAGES_PATH } from './Constants/const'
import { Spinner } from 'react-bootstrap';
import './App.scss';
import Prompt from './Components/Prompt/Prompt'

const Login = React.lazy(() => import('./Components/Login/Login'));
const Register = React.lazy(() => import('./Components/Register/Register'));
const MessageForm = React.lazy(() => import('./Components/MessageForm/MessageForm'));
const MessagesPage = React.lazy(() => import('./Components/MessagesPage/MessagesPage'));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavigationBar />
        <Suspense fallback={<Spinner animation="border" className="spinner" />}>
          <Prompt />
          <Switch>
            <Route path={HOME_PATH} exact component={MessagesPage} />
            <Route path={LOGIN_PATH} exact component={Login} />
            <Route path={REGISTER_PATH} exact component={Register} />
            <Route path={MESSAGES_PATH} exact component={MessageForm} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
