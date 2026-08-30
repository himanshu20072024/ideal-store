import {it, expect, describe} from 'vitest';
import {formatMoney} from './money';

describe('formatMoney', () => {
    it('formats 1999 as $19.99', () => {
        expect(formatMoney(1999)).toBe('₹1999.00');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(1090)).toBe('₹1090.00');
        expect(formatMoney(100)).toBe('₹100.00');
    });
});