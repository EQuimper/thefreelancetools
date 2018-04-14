interface ElapsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

const normalizeTime = (amount: string) => {
  if (amount.length === 1) {
    return `0${amount}`;
  }

  return amount;
};

export const humanizeTime = (time: ElapsedTime): string => {
  return `${normalizeTime(String(time.hours))}:${normalizeTime(
    String(time.minutes),
  )}:${normalizeTime(String(time.seconds))}`;
};
