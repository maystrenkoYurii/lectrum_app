
import React, { Component } from 'react';

import styles from './styles.m.css';


import { Consumer } from '../HOC/withProfile';

import { socket } from '../../socket';

export default class StatusBar extends Component {

    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    render () {

        //const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusMsg = online ? 'Online' : 'Ofline';

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName, currentUserLastName } = {}) => (
                        <section className = { styles.statusBar }>
                            <div className = { styles.offline }>
                                <div>{statusMsg}</div>
                                <span />
                                <button>
                                    <img alt = 'avatar' src = { avatar } />
                                    <span>{ currentUserFirstName }</span>
                                    &nbsp;
                                    <span>{ currentUserLastName }</span>
                                </button>
                            </div>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
