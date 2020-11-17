import BaseService from './index';
import { AxiosPromise } from 'axios';
import PhotoType from '../types/PhotoType';

const PhotoService = {

    retrieve: function (photo_id: number): AxiosPromise<PhotoType> {
        return BaseService.get(`photo/${photo_id}`)
    },

    retrieveAll: function (): AxiosPromise<PhotoType[]> {
        return BaseService.get(`photo`)
    },
}

export default PhotoService;
