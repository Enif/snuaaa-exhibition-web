import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import GoogleAuthType from '../types/GoogleAuthType';
import AuthService from '../services/AuthService';


function AuthUser() {

    const location = useLocation();
    const REDIRECT_URL = process.env.NODE_ENV === "production"
        ? `${process.env.PUBLIC_URL}${location.pathname}`
        : `http://localhost:3000${location.pathname}`

    useEffect(() => {
        const data = parseSearch(location.search)
        AuthService.authGoogle(data)
            .then((token) => {
                console.log(token)
                
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
            <div>Loading....</div>
            {/* <Redirect /> */}
        </div>
    )
}

export default AuthUser;


// http://localhost:3000/auth/google?
// code=4%2F4wHH2UfjgbQDtPJecu4-XQ1P4LbVerSfAPb7E3ssDBsB2cNpPJYvsDQxwF3_NSdRkmi3s7x8LSBKGN1aI2N_CaY
// &scope=email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
// &authuser=0
// &prompt=consent#
