// __tests__/formatTaskDate.test.ts
import { expect, test } from '@jest/globals';
import { formatTaskDate } from '../formatTaskDate';

test('formatTaskDate returns correctly formatted date', () => {
  expect(formatTaskDate('2025-04-06')).toBe('06/04/2025');
  expect(formatTaskDate('1999-12-31')).toBe('31/12/1999');
});
