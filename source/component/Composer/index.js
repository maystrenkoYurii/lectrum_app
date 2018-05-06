
import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';

import styles from './styles.m.css';

export default class Composer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coment: 'coment',
        };
        this.changeComment = ::this._changeComment;
    }

    _changeComment = (event) => {
        this.setState({ coment: event.target.value });
    };

    render () {

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
