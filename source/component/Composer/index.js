
import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';

import styles from './styles.m.css';

export default class Composer extends Component {
    render () {

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName }) => (
                        <section className = { styles.composer }>
                            <form>
                                <img alt = 'homer' src = { avatar } />
                                <textarea placeholder = { currentUserFirstName } />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
