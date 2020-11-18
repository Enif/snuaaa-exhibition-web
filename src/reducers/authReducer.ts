import ExhibitionAuthType from "../types/ExhibitionAuthType";
import { removeToken } from "../utils/TokenManager";

const SET = 'auth/SET' as const;
const RESET = 'auth/RESET' as const;

export const set = (auth: ExhibitionAuthType) => ({
    type: SET,
    auth
});

export const reset = () => ({
    type: RESET
});


type AuthAction = ReturnType<typeof set> | ReturnType<typeof reset>

type AuthState = {
    auth: ExhibitionAuthType
}

const initialState: AuthState = {
    auth: {
        user_id: 0,
        nickname: ''
    }
}

function authReducer(state: AuthState = initialState, action: AuthAction) {
    switch (action.type) {
        case SET:
            console.log(action)
            return {
                ...state,
                auth: action.auth
            }
        case RESET:
            removeToken();
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export default authReducer;
