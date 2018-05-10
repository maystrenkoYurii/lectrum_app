
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../../component/Post';
import Composer from '../../component/Composer';
import StatusBar from '../../component/StatusBar';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

import styles from './styles.m.css';
import animation from './animation.m.css';

import Catcher from '../../component/Catcher';

import { Counter } from '../Counter';

import { Spinner } from '../Spinner/index';
import { fromTo } from 'gsap';
import Postman from '../Postman';

import { withApi } from '../../component/HOC/withApi';

class Feed extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        createPost:           PropTypes.func.isRequired,
        createPostLike:       PropTypes.func.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        removePost:           PropTypes.func.isRequired,
    };

    _handleComposerAppear = (composer) => {
        fromTo(composer, 1, { opacity: 0 }, { opacity: 1 });
    };


    _handleCounterAppear = (counter) => {
        fromTo(counter, 1, { x: 400, opacity: 0 }, { x: 0, opacity: 1 });
    };

    render () {
        const { currentUserFirstName, currentUserLastName, avatar, createPostLike, removePost, createPost, posts, isFetching } = this.props;
        // console.log(this.props);
        const renderPost = posts.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:       animation.enter,
                    enterActive: animation.enterActive,
                    exit:        animation.exampleExit,
                    exitActive:  animation.exampleExitActive,
                } }

                key = { post.id }
                timeout = { { enter: 550, exit: 550 } }>
                <Catcher>
                    <Post
                        { ...post }
                        currentUserFirstName = { currentUserFirstName }
                        currentUserLastName = { currentUserLastName }
                        id = { post.id }
                        likePost = { createPostLike }
                        removePost = { removePost }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { styles.feed }>
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 100 }
                    onEnter = { this._handleComposerAppear }>
                    <Composer createPost = { createPost } />
                </Transition>

                <Transition
                    appear
                    in
                    timeout = { 100 }
                    onEnter = { this._handleCounterAppear }>
                    <Counter count = { renderPost.length } />
                </Transition>
                <TransitionGroup>
                    {renderPost}
                </TransitionGroup>
                <Spinner isSpinning = { isFetching } />
                <Postman
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
            </section>
        );
    }
}


export default withApi(Feed);
