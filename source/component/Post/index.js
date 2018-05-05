
import React, { Component } from 'react';
import avatar from '../../theme/assets/homer.png';

import moment from 'moment';

import styles from './styles.m.css';

export default class Post extends Component {
    render () {
        return (
            <section className = { styles.post }>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <a>Юрій</a>
                    <time>Час: {moment().format('MMMM D h:mm:ss a')}</time>
                    <p>Комент</p>
                </form>
            </section>
        );
    }
}
