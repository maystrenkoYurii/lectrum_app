
import React, { Component } from 'react';
import avatar from '../../theme/assets/homer.png';

export default class App extends Component {
    render () {
        return (
            <section>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <textarea placeholder = { 'placeholder' } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
