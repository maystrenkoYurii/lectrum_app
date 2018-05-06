// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from '../../component/HOC/withProfile';

import Feed from '../../component/Feed';

import avatar from '../../theme/assets/homer.png';

const config = {
    avatar,
    currentUserFirstName: 'Yuri',
    currentUserLastName:  'Maystrenko',
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider value = { config }>
                <Feed { ...config } />
            </Provider>
        );
    }
}
