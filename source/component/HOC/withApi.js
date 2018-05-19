
import React, { Component } from 'react';
import { api, TOKEN, GROUP_ID } from "../../config/api";
import { socket } from '../../socket';

//Flux
import { fetchPosts } from '../../flux/actions/actions';
import dispatcher from '../../flux/dispatcher';
import PostsStore from '../../flux/store';

export const withApi = (Enchanced) =>
    class WithApi extends Component {

        constructor () {
            super();
            this.state = {
                posts:      PostsStore.getPosts(),
                isFetching: false,
            };
            this.createPost = ::this._createPost;
            this.fetchPost = ::this._fetchPost;
            this.removePost = ::this._removePost;
            this.createPostLike = ::this._createPostLike;
            this.handleStoreChange = ::this._handleStoreChange;
        }

        componentDidMount () {
            const { currentUserFirstName, currentUserLastName } = this.props;

            PostsStore.subscribe(this.handleStoreChange);

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

        componentWillUnmount () {
            PostsStore.subscribe(this.handleStoreChange);
        }

        _handleStoreChange () {
            this.setState(() => ({
                posts: PostsStore.getPosts(),
            }));
        }

        _setPostsFetchingState = (state) => {
            this.setState(() => ({ isFetching: state }));
        };

        async _createPost (comment) {
            try {
                this._setPostsFetchingState(true);
                const responce = await fetch(api, {
                    method: 'POST',
                    headers: {
                        Authorization:  TOKEN,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ comment }),
                });


                if (responce.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                const { data } = await responce.json();

                this.setState(({ posts }) => ({
                    posts: [data, ...posts],
                }));
                this._setPostsFetchingState(false);
            } catch (error) {
                this._setPostsFetchingState(false);
                console.error(error);
            }
        }

        async _createPostLike (id) {
            try {
                this._setPostsFetchingState(true);
                const responce = await fetch(`${api}/${id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization:  TOKEN,
                    },
                });


                if (responce.status !== 200) {
                    throw new Error('Delete post filed');
                }

                const { data } = await responce.json();

                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === id ? data : post),
                }));
            } catch (error) {
                this._setPostsFetchingState(false);
                console.error(error);
            }
        }

        async _fetchPost () {
            try {
                this._setPostsFetchingState(true);
                const responce = await fetch(api);

                if (responce.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                const { data } = await responce.json();

                dispatcher.dispatch(fetchPosts(data));

                /*this.setState(({ posts }) => ({
                    posts: [...data, ...posts],
                }));*/
                this._setPostsFetchingState(false);
            } catch (error) {
                this._setPostsFetchingState(false);
                console.error(error);
            }
        }

        async _removePost (id) {
            try {
                this._setPostsFetchingState(true);
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
                this._setPostsFetchingState(false);
                console.error(error);
            }
        }

        render () {
            return (
                <Enchanced
                    { ...this.state }
                    { ...this.props }
                    createPost = { this.createPost }
                    createPostLike = { this.createPostLike }
                    fetchPost = { this.fetchPost }
                    removePost = { this.removePost }
                />
            );
        }
    };
