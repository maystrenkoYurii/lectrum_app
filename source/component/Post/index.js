
import React, { Component } from 'react';
import avatar from '../../theme/assets/homer.png';

export default class App extends Component {
    render () {
        return (
            <section>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <a>Комент</a>
                    <time>Врем`я</time>
                    <p>Комент</p>
                </form>
            </section>
        );
    }
}
