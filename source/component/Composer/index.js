
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.m.css';

export default class Composer extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
    };

    render () {

        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { styles.composer }>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <textarea placeholder = { currentUserFirstName } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
