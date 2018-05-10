import { sum } from './index';
import { getUniqueID } from './index';
import { getFullApiUrl } from './index';

describe('test sum function', () => {
    test('first operand should be a number', () => {
        expect(() => sum('num', 2)).toThrow('Operand 1 should be a number.');
    });

    test('second operand should be a number', () => {
        expect(() => sum(2, 'num')).toThrow('Operand 2 should be a number.');
    });

    test('sum function should return 3 for 1 + 2', () => {
        expect(sum(1, 2)).toBe(3);
    });
});


describe('test getUniqueID function', () => {
    test('operand not number', () => {
        expect(() => getUniqueID('num')).toThrow('The function argument should be a number!');
    });

    test('result length !== operand', () => {
        expect(getUniqueID(14)).toHaveLength(14);
    });

    test('result not null', () => {
        expect(getUniqueID(14)).not.toBeNull();
    });

    test('result not undefined', () => {
        expect(getUniqueID(14)).not.toBeUndefined();
    });

    test('result is string', () => {
        expect(getUniqueID(14).typeOf).not.toBe(Number);
    });
});

describe('test getFullApiUrl function', () => {
    test('operand api not string', () => {
        expect(() => getFullApiUrl(1, 'GROUP_ID')).toThrow("'api' and 'GROUP_ID' arguments passed should be a string!");
    });

    test('operand GROUP_ID not string', () => {
        expect(() => getFullApiUrl('api', 1)).toThrow("'api' and 'GROUP_ID' arguments passed should be a string!");
    });

    test('result not null', () => {
        expect(getFullApiUrl('api', 'GROUP_ID')).not.toBeNull();
    });

    test('result not undefined', () => {
        expect(getFullApiUrl('api', 'GROUP_ID')).not.toBeUndefined();
    });

    test('result is string', () => {
        expect(getFullApiUrl('api', 'GROUP_ID').typeOf).not.toBe(Number);
    });
});
