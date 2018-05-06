
import React, { Component } from 'react';

import styles from './styles.m.css';

import { Consumer } from '../HOC/withProfile';

export default class StatusBar extends Component {

    render () {

        //const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName, currentUserLastName } = {}) => (
                        <section className = { styles.statusBar }>
                            <div className = { styles.offline }>
                                <div>Ofline</div>
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
