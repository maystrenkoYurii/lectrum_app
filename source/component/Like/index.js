
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.m.css';
import { withProfile } from "../HOC/withProfile";

@withProfile
export default class Like extends Component {

    static propTypes = {
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        id:                   PropTypes.string.isRequired,
        likePost:             PropTypes.func.isRequired,
        likes:                PropTypes.arrayOf(
            PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName:  PropTypes.string.isRequired,
            })
        ).isRequired,
    };

    static defaultProps = {
        likes: [],
    };

    constructor (props) {
        super(props);
        this.changeShowLike = ::this._changeShowLike;
        this.likePost = ::this._likePost;
        this.getLikeStyle = ::this._getLikeStyle;
        this.getLikerList = ::this._getLikerList;
        this.getLikesDescription = ::this._getLikesDescription;
    }

    state = {
        showLikes: false,
    };

    _changeShowLike () {
        this.setState(({ showLikes }) => ({
            showLikes: !showLikes,
        }));
    }

    _likePost () {
        const { id, likePost } = this.props;

        likePost(id);
    }

    _getLikeByMe () {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) =>
            `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
        );
    }

    _getLikeStyle () {
        const likedByMe = this._getLikeByMe();

        return likedByMe ? `${Styles.icon} ${Styles.liked}` : `${Styles.icon}`;
    }

    _getLikerList () {
        const { showLikes } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }>{`${firstName} ${lastName}`}</li>
        ));

        return showLikes && likes.length ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription () {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;
        const likedByMe = this._getLikeByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} others`;
        }

        return likes.length;
    }

    render () {
        const likers = this.getLikerList();
        const likersStyle = this.getLikeStyle();
        const likersDescryption = this.getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span className = { likersStyle } onClick = { () => this.props.likePost(this.props.id) }>
                    Like
                </span>
                <div>
                    { likers }
                    <span
                        onMouseEnter = { this.changeShowLike }
                        onMouseLeave = { this.changeShowLike }>
                        { likersDescryption }
                    </span>
                </div>
            </section>
        );
    }
}
