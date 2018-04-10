import { inspect, wiretap } from 'mobx-wiretap/mst';

import { CurrentTimer } from './CurrentTimer';

const currentTimer = CurrentTimer.create();

wiretap('Freelance Tools');

inspect('Current Timer', currentTimer);

// @ts-ignore
window.currentTimer = currentTimer;

export const store = {
  currentTimer,
};
