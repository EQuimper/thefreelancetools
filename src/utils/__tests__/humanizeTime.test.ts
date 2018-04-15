import { ElapsedTimeInterface } from '@freelance-tool/types';

import { humanizeTime } from '../humanizeTime';

describe('#humanizeTime()', () => {
  it('should return time like human read it', () => {
    const time: ElapsedTimeInterface = {
      hours: 12,
      minutes: 20,
      seconds: 10,
      totalSeconds: 12 * 60 * 60 + 20 * 60 + 10,
    };

    expect(humanizeTime(time)).toBe('12:20:10');
  });
});
