import axios, { AxiosPromise } from 'axios';
import { getToken } from '../utils/TokenManager';

const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();

const BaseService = {
 
    get: function(url: string) {
        return axios.get(`${SERVER_URL}/${url}`)
    },
    
    post: function(url: string, data: object): AxiosPromise {
        return axios.post(`${SERVER_URL}/${url}`, data)
    },

    postWithProgress: function(url: string, data: object, cb: (pg: ProgressEvent)=> void) {
        return axios.post(`${SERVER_URL}/${url}`, data, {
            onUploadProgress: cb
        })
    },

    patch: function(url: string, data: object): AxiosPromise {
        return axios.patch(`${SERVER_URL}/${url}`, data)
    },
    
    delete: function(url: string): AxiosPromise {
        return axios.delete(`${SERVER_URL}/${url}`)
    }
}

export default BaseService;
