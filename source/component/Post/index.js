
import React, { Component } from 'react';
import avatar from '../../theme/assets/homer.png';

import moment from 'moment';

export default class Post extends Component {
    render () {
        return (
            <section>
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <a>Комент</a>
                    <time>Врем`я: {moment().format('MMMM D h:mm:ss a')}</time>
                    <p>Комент</p>
                </form>
            </section>
        );
    }
}
