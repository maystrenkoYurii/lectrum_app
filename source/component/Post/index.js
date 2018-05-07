
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Like from '../../component/Like';

import styles from './styles.m.css';

export default class Post extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        comment:              PropTypes.string.isRequired,
        created:              PropTypes.number.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        firstName:            PropTypes.string.isRequired,
        id:                   PropTypes.string.isRequired,
        lastName:             PropTypes.string.isRequired,
        likePost:             PropTypes.func.isRequired,
        removePost:           PropTypes.func.isRequired,
    };

    // shouldComponentUpdate (nextProps) {
    //     if (this.props.avatar !== nextProps.avatar &&
    //         this.props.coment !== nextProps.coment &&
    //         this.props.currentUserFirstName !== nextProps.currentUserFirstName &&
    //         this.props.currentUserLastName !== nextProps.currentUserLastName) {
    //         return true;
    //     }
    //
    //     return false;
    // }

    _getCross = () => {
        const { currentUserFirstName, currentUserLastName, firstName, lastName, removePost, id } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            ? <span className = { styles.cross } onClick = { () => removePost(id) } /> : null;
    };

    render () {
        const { avatar, comment, created, firstName, lastName, currentUserFirstName, currentUserLastName, id, likePost } = this.props;

        const user = `${firstName} ${lastName}`;

        return (
            <section className = { styles.post }>
                { this._getCross() }
                <img alt = 'homer' src = { avatar } />
                <a>{ user }</a>
                <time>Час: {created}</time>
                <p>{ comment }</p>
                <Like
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                    id = { id }
                    likePost = { likePost }
                    likes = { this.props.likes }
                />
            </section>
        );
    }
}
