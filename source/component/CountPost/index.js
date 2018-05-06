
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.m.css';

export default class Comp extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]).isRequired,
        count:    PropTypes.number.isRequired,
    };
    render () {

        return (
            <div className = { Styles.posts }>
                <span>Постов: {this.props.count}</span>
                {this.props.children}
            </div>
        );
    }
}
