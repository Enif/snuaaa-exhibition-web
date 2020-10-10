import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { set, reset } from "../reducers/authReducer";
import ExhibitionAuthType from "../types/ExhibitionAuthType";


function useAuth() {

    const auth = useSelector((state: RootState) => state.authReducer.auth)
    const dispatch = useDispatch();

    const setAuth = (auth: ExhibitionAuthType) => dispatch(set(auth));
    const resetAuth = () => dispatch(reset());

    return { auth, setAuth, resetAuth }
}

export default useAuth;
