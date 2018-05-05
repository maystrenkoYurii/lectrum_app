
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './styles.m.css';

export default class Post extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { styles.post }>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <a>Юрій</a>
                    <time>Час: {moment().format('MMMM D h:mm:ss a')}</time>
                    <p>Комент</p>
                </form>
            </section>
        );
    }
}
