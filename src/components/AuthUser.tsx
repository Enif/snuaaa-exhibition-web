import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import GoogleAuthType from '../types/GoogleAuthType';
import AuthService from '../services/AuthService';
import useAuth from '../hooks/useAuth';
import jsonwebtoken from 'jsonwebtoken'
import { setToken } from '../utils/TokenManager';

function AuthUser() {

    const location = useLocation();
    const { auth, setAuth } = useAuth();

    const REDIRECT_URL = process.env.NODE_ENV === "production"
        ? `${process.env.PUBLIC_URL}${location.pathname}`
        : `http://localhost:3000${location.pathname}`

    useEffect(() => {
        const data = parseSearch(location.search)
        AuthService.authGoogle(data)
            .then((res) => {
                const payload: any = jsonwebtoken.decode(res.data)
                setToken(res.data)
                setAuth({
                    user_id: payload.user_id,
                    nickname: payload.nickname
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const parseSearch = function (search: string) {

        const queries = search
            .substr(1)
            .split('&')

        const data: GoogleAuthType = {
            authuser: "",
            code: "",
            prompt: "",
            scope: "",
            redirect_uri: REDIRECT_URL
        }
        for (const query of queries) {
            const [key, value] = query.split('=')
            if (key === "authuser"
                || key === "code"
                || key === "prompt"
                || key === "scope") {
                data[key] = value;
            }
        }
        return data;
    }

    return (
        <div className="auth-wrapper">
            {
                auth.user_id ?
                    <Redirect to="/hall" />
                    :
                    <div>Authenticating User....</div>
            }
        </div>
    )
}

export default AuthUser;
