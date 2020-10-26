import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer } from './auth-reducer';
import { delegatorReducer } from './delegator';
import { guardiansReducer } from './guardians';

const rootReducer = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        delegator: delegatorReducer,
        guardians: guardiansReducer
    });

export default rootReducer;
