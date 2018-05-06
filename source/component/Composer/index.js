
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
        this.handleSubmit = ::this._handleSubmit;
        this.copyDisable = ::this._copyDisable;
    }

    _changeComment = (event) => {
        this.setState({ coment: event.target.value });
    };

    _handleSubmit = (e) => {
        e.preventDefault();
        const { coment } = this.state;
        const { createPost } = this.props;

        if (coment) {
            createPost(coment);
            this.setState({ coment: '' });
        }
    };

    _copyDisable = (event) => {
        event.preventDefault();
    };

    _keyEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    };

    render () {

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName }) => (
                        <section className = { styles.composer }>
                            <form onSubmit = { this.handleSubmit }>
                                <img alt = 'homer' src = { avatar } />
                                <textarea
                                    placeholder = { currentUserFirstName }
                                    value = { this.state.coment }
                                    onChange = { this.changeComment }
                                    onCopy = { this.copyDisable }
                                    onKeyDown = { this._keyEnter }
                                />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
