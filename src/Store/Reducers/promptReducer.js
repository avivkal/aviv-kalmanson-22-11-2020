const initialState = {
    show: false,
    promptTitle: '',
    promptText: '',
    showSuccess: false,
    subjectOptional: '',
    isDelete: false,
    idToDelete: ''
}

const promptReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLOSE_PROMPT':
            return {
                ...state,
                show: false
            }
        case 'OPEN_PROMPT':
            return {
                ...state,
                show: true,
                promptTitle: action.title,
                promptText: action.text,
                subjectOptional: action.subjectOptional
            }
        case 'OPEN_PROMPT_DELETE':
            return {
                ...state,
                showDelete: true,
                promptTitle: action.title,
                promptText: action.text
            }

        case 'CLOSE_PROMPT_DELETE':
            return {
                ...state,
                showDelete: false,
            }
        case 'TOGGLE_SUCCESS':
            return {
                ...state,
                showSuccess: !state.showSuccess,
            }
        case 'IS_DELETE':
            return {
                ...state,
                isDelete: true,
            }

        case 'IS_DELETE_FINISHED':
            return {
                ...state,
                isDelete: false,
            }
        case 'SET_ID_TO_DELETE':
            return {
                ...state,
                idToDelete: action.payload,
            }


        default:
            return state
    }
}

export default promptReducer;