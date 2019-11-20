import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Customer from "./components/Customer";
import PrivateRoute from './shared/auth/private-route';
import {AUTHORITIES} from './shared/config/constants'

const User = ({match}) => {
    return (<h1> 사용자 상세 정보: {match.params.username}</h1>)
};

const Routes = () => {
    return (
        <Router>
            <Route path="/" exact component={Customer}/>
            <Route path="/test" render={
                () => {
                    return (
                        <h2> test component</h2>
                    )
                }
            }/>
            <Route path="/user/:username" component={User}/>
            <PrivateRoute path="/marketing" component={Customer} hasAnyAuthorities={[AUTHORITIES.AM, AUTHORITIES.ASV]} />
            <PrivateRoute path="/management" component={Customer} hasAnyAuthorities={[AUTHORITIES.AM]} />
            <PrivateRoute path="/analytics" component={Customer} hasAnyAuthorities={[AUTHORITIES.AM, AUTHORITIES.ASV]} />
        </Router>
    )
};

export default Routes;
