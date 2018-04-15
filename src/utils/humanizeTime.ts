import { ElapsedTimeInterface } from '@freelance-tool/types';

const normalizeTime = (amount: string) => {
  if (amount.length === 1) {
    return `0${amount}`;
  }

  return amount;
};

export const humanizeTime = (time: ElapsedTimeInterface): string => {
  return `${normalizeTime(String(time.hours))}:${normalizeTime(
    String(time.minutes),
  )}:${normalizeTime(String(time.seconds))}`;
};
