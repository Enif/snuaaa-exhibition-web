import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router';
import jsonwebtoken from 'jsonwebtoken'

import Hall from './Hall';
import Welcome from './Welcome';
import AuthUser from './AuthUser';
import useAuth from '../hooks/useAuth';
import { getToken } from '../utils/TokenManager';
import AuthService from '../services/AuthService';

function Section() {
    const { auth, setAuth, resetAuth } = useAuth();
    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        checkLocation()
    }, [history, auth])


    const checkLocation = function () {
        if (!auth.user_id) {
            const accessToken = getToken();
            if (accessToken) {
                AuthService.checkToken()
                    .then((res) => {
                        const payload: any = jsonwebtoken.decode(res.data)
                        setAuth({
                            user_id: payload.user_id,
                            nickname: payload.nickname
                        })
                    })
                    .catch((err) => {
                        resetAuth();
                    })
            }
            else if (location.pathname === "/hall") {
                history.replace("/")
            };
        }
        else if (location.pathname === "/") {
            history.replace("/hall")
        }

    }

    return (
        <Switch>
            <Route path="/hall" component={Hall} />
            <Route path="/auth" component={AuthUser} />
            <Route path="/" component={Welcome} />
        </Switch>
    )
}

export default Section;
