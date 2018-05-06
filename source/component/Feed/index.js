
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../../component/Post';
import Composer from '../../component/Composer';
import StatusBar from '../../component/StatusBar';

import { api, TOKEN } from "../../config/api";

import styles from './styles.m.css';

import Catcher from '../../component/Catcher';

import CountPost from '../../component/CountPost';

export default class Feed extends Component {

    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            posts: [],
        };
        this.createPost = ::this._createPost;
        this.fetchPost = ::this._fetchPost;
    }

    componentDidMount () {
        this.fetchPost();
    }


    _createPost = (comment) => {
        console.log(comment);
        fetch(api, {
            method: 'POST',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                return response.json();
            })
            .then(({ data }) => {
                console.log(data);
                this.setState(({ posts }) => ({
                    posts: [data, ...posts],
                }));
            });
    };

    _fetchPost () {
        fetch(api)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                return response.json();
            })
            .then(({ data }) => {
                console.log(data);
                this.setState(({ posts }) => ({
                    posts: [...data, ...posts],
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }

    render () {
        const { posts } = this.state;

        const renderPost = posts.map((post) => (
            <Catcher key = { post.id }>
                <Post { ...post } />
            </Catcher>
        ));

        return (
            <section className = { styles.feed }>
                <StatusBar />
                <Composer createPost = { this.createPost } />
                <CountPost count = { renderPost.length } >{renderPost}</CountPost>
            </section>
        );
    }
}
