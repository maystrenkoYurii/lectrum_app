import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.m.css';


export class Spinner extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    render () {

        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        const hollo = `Привет ${currentUserFirstName} ${currentUserLastName}`;

        return (
            <div className = { Styles.postman }>
                <img src = { avatar } />
                { hollo }
            </div>
        );
    };
}
