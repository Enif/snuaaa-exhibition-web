import BaseService from './index';
import { AxiosPromise } from 'axios';
import GuestBookType from '../types/GuestBookType';

const GuestBookService = {

    retrieveAll: function (): AxiosPromise<GuestBookType[]> {
        return BaseService.get(`guestbook`)
    },

    create: function (data: { text: string }): AxiosPromise {
        return BaseService.post(`guestbook`, data);
    }

}

export default GuestBookService;
