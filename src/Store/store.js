import mainReducer from './Reducers/mainReducer'
import propmpReducer from './Reducers/promptReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import loadingReducer from './Reducers/loadingReducer';

const rootReducer = combineReducers({
    main: mainReducer,
    prompt: propmpReducer,
    loading: loadingReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
