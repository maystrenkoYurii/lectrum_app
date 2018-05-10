import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Composer } from './';

configure({ adapter: new Adapter() });

const state = {
    coment: '',
};

const props = {
    avatar:               '',
    createPost:           jest.fn(),
    currentUserFirstName: '',
};

const message = 'Hello lectrum!';
const mutateState = {
    coment: message,
};

const result = mount(<Composer { ...props } />);

const spy = jest.spyOn(Composer.prototype, 'render');

global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json:   jest.fn(() => Promise.resolve({ data: ['some fake data']})),
}));

console.log(result.debug());

describe('Composer component', () => {
    test('Should have 1 section element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('Should have 1 form element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('Should have 1 img element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('Should have 1 textarea element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('Should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('Should have a valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('text area have should be ampty initialy', () => {
        expect(result.find('textarea').text()).toBe(state.coment);
    });

    test('text area chenge initialy state', () => {
        result.setState(() => ({
            coment: message,
        }));

        expect(result.state()).toEqual(mutateState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            coment: '',
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe(state.coment);
    });

    test('comment state and textarea value shuold reflect according change', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message,
            },
        });

        expect(result.state()).toEqual(mutateState);
        expect(result.find('textarea').text()).toBe(message);
    });

    test('comment state and textarea value shuold reflect according form submit', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);
    });

    test('createPost method should be invoked once after from submiting', () => {
        console.log(spy.mock);
        expect(props.createPost.mock.calls).toHaveLength(1);
    });
});
