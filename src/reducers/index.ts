import { combineReducers } from 'redux';
import photoReducer from './photoReducer';

const rootReducer = combineReducers({
    photoReducer,
    // product
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
