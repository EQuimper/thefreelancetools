import { inspect, wiretap } from 'mobx-wiretap/mst';

import { CurrentTimer } from './CurrentTimer';

const currentTimer = CurrentTimer.create({
  elapseTime: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
});

wiretap('Freelance Tools');

inspect('Current Timer', currentTimer);

// @ts-ignore
window.currentTimer = currentTimer;

export const store = {
  currentTimer,
};
