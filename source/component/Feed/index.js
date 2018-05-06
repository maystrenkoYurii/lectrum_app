
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
            post: [...post, { id: getUniqueID(), newPost }],
        }));
    };

    render () {

        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { styles.feed }>
                <StatusBar />
                <Composer createPost = { this.createPost } />
                <Post
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
            </section>
        );
    }
}
