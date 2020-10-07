import React from 'react';
import { Switch, Route } from 'react-router';
import Hall from './Hall';
import Welcome from './Welcome';
import AuthUser from './AuthUser';

function Section() {

    return (
        <Switch>
            <Route path="/hall" component={Hall} />
            <Route path="/auth" component={AuthUser} />
            <Route path="/" component={Welcome} />
        </Switch>
    )
}

export default Section;
