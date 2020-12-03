import { actionTypes } from '../actionTypes'

const finishedLoading = () => {
    return {
        type: actionTypes.FINISHED_LOADING
    }
}

const loading = () => {
    return {
        type: actionTypes.LOADING
    }
}

export {
    loading,
    finishedLoading
}
