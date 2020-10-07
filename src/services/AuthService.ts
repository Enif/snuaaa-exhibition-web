import BaseService from './index';
import { AxiosPromise } from 'axios';
import GoogleAuthType from '../types/GoogleAuthType';
// import PhotoType from '../types/PhotoType';

const AuthService = {

    authGoogle: function (data: GoogleAuthType): AxiosPromise<any> {
        return BaseService.post(`auth/google`, data)
    }


}

export default AuthService;
