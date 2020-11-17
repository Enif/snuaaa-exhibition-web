import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import useAuth from '../hooks/useAuth';

function NicknameInput() {


    const [nickname, setNickname] = useState("");
    const { setAuth } = useAuth();

    const updateUserNickname = async () => {
        try {
            const response = await UserService.updateUserNickname({ nickname });
            console.log(response.data)
            setAuth(response.data)
        }
        catch (err) {
            alert('닉네임을 동록할 수 없습니다.')
            console.error(err)
        }
    }

    return (
        <div>
            <p>방명록을 남기실 닉네임을 설정해주세요</p>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <button onClick={() => updateUserNickname()}>확인</button>
        </div>
    )
}

export default NicknameInput;
