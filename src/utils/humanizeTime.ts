export const humanizeTime = (time: string): string => {
  if (time.length === 1) {
    return `0${time}`;
  }

  return time;
};
