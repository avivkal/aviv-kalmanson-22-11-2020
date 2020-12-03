const initialState = {
    currentUser: {},
    loggedIn: false,
    userInbox: [],
    userSent: [],
    loading: false
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USERNAME':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'LOGGED_IN':
            return {
                ...state,
                loggedIn: true
            }
        case 'UPDATE_INBOX':
            return {
                ...state,
                userInbox: action.payload
            }
        case 'UPDATE_SENT':
            return {
                ...state,
                userSent: action.payload
            }

        default:
            return state
    }
}

export default mainReducer;