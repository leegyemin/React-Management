import React, {Component} from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }

    // root Props의 auth와 routes props의 auth를 비교해서 값이 없는경우 redirect 한다.

    render() {
        return (
            <div>App</div>
        );
    }
}


export default App;
