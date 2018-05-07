import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.m.css';


export default class Spinner extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    componentDidMount () {
       this.hello();
    }

    hello = () => {
        if (!localStorage.getItem('firstEnters') || true) {
            setTimeout(this.close, 4000);
        }
    };

    close = () => {
        localStorage.setItem('firstEnters', true);
        this.setState({ open: false });
    };

    render () {

        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { open } = this.state;

        const hello = `Привет ${currentUserFirstName} ${currentUserLastName}`;

        if (open) {
            return (
                <div className = { Styles.postman }>
                    <img src = { avatar } />
                    <span>{ hello }</span>
                </div>
            );
        }

        return null;
    }
}
