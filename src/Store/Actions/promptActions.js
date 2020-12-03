import { actionTypes } from '../actionTypes'
import axios from 'axios'
import { store } from '../store'
import { loading, finishedLoading } from './loadingActions'
import { getEmails } from './mainActions'
const deleteMessagePrompt = () => {
    return {
        type: actionTypes.DELETE,
    }
}

const toggleSuccess = () => {
    return {
        type: actionTypes.TOGGLE_SUCCESS,
    }
}

const closePrompt = () => dispatch => {
    dispatch(deletePromptFinished())
    dispatch(closePromptFunc())

}

const closePromptFunc = () => {
    return {
        type: actionTypes.CLOSE_PROMPT,
    }
}

const openPromptDelete = (title, text) => {
    return {
        type: actionTypes.OPEN_PROMPT_DELETE,
        title,
        text
    }

}

const closePromptDelete = (title, text) => {
    return {
        type: actionTypes.CLOSE_PROMPT_DELETE,
        title,
        text
    }

}
const deletePrompt = () => {
    return {
        type: actionTypes.IS_DELETE,
    }
}

const deletePromptFinished = () => {
    return {
        type: actionTypes.IS_DELETE_FINISHED,
    }
}

const deletePromptSetId = (id) => {
    return {
        type: actionTypes.SET_ID_TO_DELETE,
        payload: id
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

const deleteMessage = () => async dispatch => {
    const id = store.getState().prompt.idToDelete;
    dispatch(loading());
    try {
        axios.delete('/messages/' + id)
            .then(data => {
                dispatch(getEmails())
            })
    }
    catch (error) {
        dispatch(openPrompt('Error', error.response.data))
    }
    finally {
        dispatch(finishedLoading());
    }
}


export {
    closePrompt,
    openPrompt,
    deleteMessagePrompt,
    openPromptDelete,
    closePromptDelete,
    toggleSuccess,
    deletePrompt,
    deletePromptSetId,
    deletePromptFinished,
    deleteMessage
}