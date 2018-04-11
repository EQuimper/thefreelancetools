import { inspect, wiretap } from 'mobx-wiretap/mst';

import { CurrentTimer } from './CurrentTimer';
import { ModalsManager } from './ModalsManager';

const currentTimer = CurrentTimer.create({
  elapseTime: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
});

const modalsManager = ModalsManager.create();

wiretap('Freelance Tools');

inspect('Current Timer', currentTimer);
inspect('Modals Manager', modalsManager);

// @ts-ignore
window.currentTimer = currentTimer;
// @ts-ignore
window.modalsManager = modalsManager;

export const store = {
  currentTimer,
  modalsManager,
};
