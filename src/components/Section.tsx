import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router';
import jsonwebtoken from 'jsonwebtoken'

import Hall from './Hall';
import Welcome from './Welcome';
import AuthUser from './AuthUser';
import useAuth from '../hooks/useAuth';
import { getToken } from '../utils/TokenManager';

function Section() {

    const { auth, setAuth } = useAuth();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        checkToken();
    }, [])

    useEffect(() => {
        checkLocation()
    }, [history, auth])

    const checkToken = function () {
        const accessToken = getToken();
        if (accessToken) {
            const payload: any = jsonwebtoken.decode(accessToken)
            setAuth({
                user_id: payload.user_id,
                nickname: payload.nickname
            })
        }
    }

    const checkLocation = function () {

        if (!auth.user_id && location.pathname === "/hall") {
            history.replace("/")
        }
        else if (auth.user_id && location.pathname === "/") {
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
