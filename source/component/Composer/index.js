
import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';
import PropTypes from 'prop-types';

import styles from './styles.m.css';

export default class Composer extends Component {

    static propTypes = {
        createPost: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            coment: 'coment',
        };
        this.changeComment = ::this._changeComment;
    }

    _changeComment = (event) => {
        this.setState({ coment: event.target.value });
    };

    createPost = () => {
        const { coment } = this.state;
        const { createPost } = this.props;

        createPost(coment);
    };

    render () {

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName }) => (
                        <section className = { styles.composer }>
                            <form onSubmit = { this.createPost }>
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
