import React, { Component } from 'react';

import Styles from './styles.m.css';


export class Spinner extends Component {
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <div className = { Styles.postman }>
                <img src = { avatar }>
            </div>
        )
    }
}
