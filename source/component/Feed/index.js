
import React, { Component } from 'react';

import Post from '../../component/Post';
import Composer from '../../component/Composer';

import styles from './styles.m.css';

export default class Feed extends Component {
    render () {
        return (
            <section className = { styles.feed }>
                <Composer />
                <Post />
            </section>
        );
    }
}
