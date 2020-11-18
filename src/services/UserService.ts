import BaseService from './index';
import { AxiosPromise } from 'axios';
import ExhibitionAuthType from '../types/ExhibitionAuthType';

const UserService = {

    updateUserNickname: function (data: { nickname: string }): AxiosPromise<ExhibitionAuthType> {
        return BaseService.patch(`user`, data)
    },

    checkUserDidVoted: function (): AxiosPromise<{ didVoted: boolean }> {
        return BaseService.get(`user/voted`)
    }

}

export default UserService;
