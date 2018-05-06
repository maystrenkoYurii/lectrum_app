
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './styles.m.css';

export default class Post extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        coment:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    shouldComponentUpdate (nextProps) {
        if (this.props.avatar !== nextProps.avatar &&
            this.props.coment !== nextProps.coment &&
            this.props.currentUserFirstName !== nextProps.currentUserFirstName &&
            this.props.currentUserLastName !== nextProps.currentUserLastName) {
            return true;
        }

        return false;
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName, coment } = this.props;

        const user = `${currentUserFirstName} ${currentUserLastName}`;

        return (
            <section className = { styles.post }>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <a>{ user }</a>
                    <time>Час: {moment().format('MMMM D h:mm:ss a')}</time>
                    <p>{ coment }</p>
                </form>
            </section>
        );
    }
}
