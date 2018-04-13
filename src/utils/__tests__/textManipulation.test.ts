import { capitalize } from '../textManipulation';

describe('textManipulation helpers', () => {
  describe('#capitalize()', () => {
    it('should return a string with the first letter uppercase', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('wow')).toBe('Wow');
      expect(capitalize('hello world')).toBe('Hello world');
      expect(capitalize('HELLO')).toBe('Hello');
    });
  });
});
