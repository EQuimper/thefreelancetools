import { inspect, wiretap } from 'mobx-wiretap/mst';

import { CurrentTimer } from './CurrentTimer';
import { ModalsManager } from './ModalsManager';
import { Project, Projects, Task } from './Projects';

export { Project, Task };

const currentTimer = CurrentTimer.create({
  elapseTime: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
});

const modalsManager = ModalsManager.create();

const projects = Projects.create();

wiretap('Freelance Tools');

inspect('Current Timer', currentTimer);
inspect('Modals Manager', modalsManager);
inspect('Projects', projects);

export const store = {
  currentTimer,
  modalsManager,
  projects,
};
