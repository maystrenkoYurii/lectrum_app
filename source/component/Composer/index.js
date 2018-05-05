
import React, { Component } from 'react';
import avatar from '../../theme/assets/homer.png';

import styles from './styles.m.css';

export default class App extends Component {
    render () {
        return (
            <section className = { styles.composer }>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <textarea placeholder = { 'placeholder' } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
