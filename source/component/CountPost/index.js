import React from 'react';

import Styles from './styles.m.css';

export const Counter = ({ count }) => {
    return (
        <div className = { Styles.posts }>
            <span>Постов: {count}</span>
        </div>
    );
};
