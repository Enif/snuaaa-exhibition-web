import { combineReducers } from 'redux';
import photoReducer from './photoReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    photoReducer,
    authReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
