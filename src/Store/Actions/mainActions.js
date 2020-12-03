import { actionTypes } from '../actionTypes'
import axios from 'axios'
import { URL } from '../../Constants/const'
import { setCurrentUser, userExists } from '../../UtilityFunctions/functions'
import { store } from '../store'
import { loading, finishedLoading } from './loadingActions'
import { toggleSuccess } from './promptActions'

const updateUsername = (user) => {
    setCurrentUser(user);
    return {
        type: actionTypes.UPDATE_USERNAME,
        payload: user
    }
}

const openPrompt = (title, text, subjectOptional) => {
    return {
        type: actionTypes.OPEN_PROMPT,
        title,
        text,
        subjectOptional
    }
}


const loggedIn = () => {
    return {
        type: actionTypes.LOGGED_IN
    }
}

const logIn = (email, password) => async dispatch => {
    dispatch(loading());
    try {
        const user = await axios.post('/login', { email: email, password: password })
        await dispatch(updateUsername(user.data));
        await dispatch(loggedIn());
    }
    catch (error) {
        dispatch(openPrompt('Error', error.response.data))
    }
    finally {
        dispatch(finishedLoading());
    }
}

const register = (email, password) => async dispatch => {
    dispatch(loading());
    try {
        const user = await axios.post(URL + '/register', { email: email, password: password })
        await dispatch(updateUsername(user.data));
        await dispatch(loggedIn());
    }
    catch (error) {
        dispatch(openPrompt('Error', error.response.data))
    }
    finally {
        dispatch(finishedLoading());
    }
}

const getEmails = () => async dispatch => {
    dispatch(loading());
    try {
        const userEmail = store.getState().main.currentUser.email;
        await axios.get('/messages/sent/' + userEmail).then(sent => {
            dispatch(updateSent(sent.data))
        })
        await axios.get('/messages/inbox/' + userEmail).then(inbox => {
            dispatch(updateInbox(inbox.data))
        })
    }
    catch (error) {
        dispatch(openPrompt('Error', error.response.data))
    }
    finally {
        dispatch(finishedLoading());
    }
}



const updateInbox = (inboxEmails) => {
    return {
        type: actionTypes.UPDATE_INBOX,
        payload: inboxEmails
    }
}

const sendMessage = (receiver, subject, message) => async dispatch => {
    const currentUser = store.getState().main.currentUser;
    dispatch(loading())
    try {
        const user = await axios.get('/findUsers/' + receiver)
        if (userExists(user.data)) {
            await axios.post('/messages/' + currentUser._id,
                {
                    sender: currentUser.email,
                    receiver: receiver,
                    message: message,
                    subject: subject,
                    creationDate: new Date(),
                });
            dispatch(toggleSuccess());
        }
        else {
            dispatch(openPrompt('Error', 'Email not found'))
        }
    }
    catch (error) {
        dispatch(openPrompt('Error', error))
    }
    finally {
        dispatch(finishedLoading())
    }
}


const updateSent = (sentEmails) => {
    return {
        type: actionTypes.UPDATE_SENT,
        payload: sentEmails
    }
}

export {
    updateUsername,
    loggedIn,
    logIn,
    register,
    getEmails,
    sendMessage
}
