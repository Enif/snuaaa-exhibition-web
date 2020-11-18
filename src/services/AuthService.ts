import BaseService from './index';
import { AxiosPromise } from 'axios';
import GoogleAuthType from '../types/GoogleAuthType';

const AuthService = {

    authGoogle: function (data: GoogleAuthType): AxiosPromise<string> {
        return BaseService.post(`auth/google`, data)
    },

    checkToken: function() : AxiosPromise<string> {
        return BaseService.get(`auth/check`)
    }

}

export default AuthService;
