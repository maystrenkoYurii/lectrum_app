import React, { Component } from 'react';

import createPortal from 'react-dom';

import PropTypes from 'prop-types';

import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export default class Like extends Component {
    render () {
        const { isSpining } = this.props;

        return createPortal(
            isSpining ? <div className = { Styles.spinner } /> : null, portal
        );
    };
}
