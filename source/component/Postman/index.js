import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.m.css';

import { Transition } from 'react-transition-group';

import { fromTo } from 'gsap';

export default class Spinner extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            isPostmanAppear: true,
        };
    }

    _handlePostmanAppear = (postman) => {
        fromTo(postman, 1, { x: 400, opacity: 0 }, {
            x:          0,
            opacity:    1,
            onComplete: () => {
                setTimeout(() => {
                    localStorage.setItem('isHello', true);
                    this.setState(() => ({
                        isPostmanAppear: false,
                    }));
                }, 5000);
            },
        });
    };

    _handlePostmanDisappear = (postman) => {
        fromTo(postman, 1, { x: 0, opacity: 1 }, { x: 400, opacity: 0 });
    };

    render () {

        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        const hello = `Привет ${currentUserFirstName} ${currentUserLastName}`;

        const isHello = localStorage.getItem('isHello') ? JSON.stringify(localStorage.getItem('isHello')) : false;

        console.log('XX ' + isHello);

        if (!isHello) {

            console.log('XX ' + isHello);
            return (
                <Transition
                    appear
                    in
                    timeout = { 100 }
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDisappear }>
                    <div className = { Styles.postman }>
                        <img src = { avatar } />
                        <span>{ hello }</span>
                    </div>
                </Transition>
            );
        }

        return null;
    }
}
