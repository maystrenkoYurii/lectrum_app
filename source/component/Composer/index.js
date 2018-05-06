
import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';

import styles from './styles.m.css';

export default class Composer extends Component {
    render () {

        state = {
            coment: 'coment',
        };

        changeComment = (event) => {
            this.setState({ coment: event.target.value });
        };

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName }) => (
                        <section className = { styles.composer }>
                            <form>
                                <img alt = 'homer' src = { avatar } />
                                <textarea placeholder = { currentUserFirstName } value = { this.state.coment } onChange = { this.changeComment } />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
