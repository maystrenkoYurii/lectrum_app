
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../../component/Post';
import Composer from '../../component/Composer';
import StatusBar from '../../component/StatusBar';

import { api, TOKEN, GROUP_ID } from "../../config/api";
import { socket } from '../../socket';

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
        this.removePost = ::this._removePost;
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this.fetchPost();

        socket.emit('join', GROUP_ID);
        socket.on('create', (postJSON) => {
            const { data: createPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: [createPost, ...posts],
                }));

                console.log(createPost);
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: { id }, meta } = JSON.parse(postJSON);

            if (`${meta.authorFirstName} ${meta.authorLastName}` !== `${currentUserFirstName} ${currentUserLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== id),
                }));
            }
        });
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

    async _removePost (id) {
        try {
            const responce = await fetch(`${api}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization:  TOKEN,
                },
            });


            if (responce.status !== 204) {
                throw new Error('Delete post filed');
            }

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch (error) {
            console.error(error);
        }
    }

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
        const { currentUserFirstName, currentUserLastName } = this.props;

        const renderPost = posts.map((post) => (
            <Catcher key = { post.id }>
                <Post
                    { ...post }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                    id = { post.id }
                    removePost = { this.removePost }
                />
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
