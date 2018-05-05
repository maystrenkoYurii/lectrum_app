
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../../component/Post';
import Composer from '../../component/Composer';

import styles from './styles.m.css';

export default class Feed extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    render () {

        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { styles.feed }>
                <Composer />
                <Post
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
            </section>
        );
    }
}
