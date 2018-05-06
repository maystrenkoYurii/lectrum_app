
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../../component/Post';
import Composer from '../../component/Composer';
import StatusBar from '../../component/StatusBar';

import styles from './styles.m.css';
import {getUniqueID} from "../../instruments/index";

export default class Feed extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            post: [],
        };
        this.createPost = ::this._createPost;
    }

    _createPost = (newPost) => {
        this.setState(({ post }) => ({
            post: [{ id: getUniqueID(), coment: newPost }, ...post],
        }));
    };

    render () {

        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { post } = this.state;

        const renderPost = post.map(({ id, coment }) => (
            <Post
                avatar = { avatar }
                coment = { coment }
                currentUserFirstName = { currentUserFirstName }
                currentUserLastName = { currentUserLastName }
                key = { id }
            />
        ));

        return (
            <section className = { styles.feed }>
                <StatusBar />
                <Composer createPost = { this.createPost } />
                {renderPost}
            </section>
        );
    }
}
