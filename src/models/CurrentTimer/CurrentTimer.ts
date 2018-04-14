import { types } from 'mobx-state-tree';

import { humanizeTime } from '@freelance-tool/utils';

import { Project, Task } from '../Projects';

export const CurrentTimer = types
  .model('CurrentTimer', {
    elapseTime: types.model({
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    }),
    isRunning: false,
    intervalId: types.maybe(types.number),
    project: types.maybe(types.reference(Project)),
    task: types.maybe(types.reference(Task)),
  })
  .actions(self => ({
    updateElapseTime() {
      self.elapseTime.seconds += 1;
      self.elapseTime.totalSeconds += 1;

      if (self.elapseTime.seconds === 60) {
        self.elapseTime.minutes += 1;
        self.elapseTime.seconds = 0;

        if (self.elapseTime.minutes === 60) {
          self.elapseTime.hours += 1;
          self.elapseTime.minutes = 0;
        }
      }
    },
  }))
  .actions(self => ({
    start(project: typeof Project.Type, task: typeof Task.Type) {
      self.intervalId = Number(setInterval(self.updateElapseTime, 1000));
      self.isRunning = true;
      self.project = project;
      self.task = task;
    },
  }))
  .actions(self => ({
    stop() {
      if (self.intervalId) {
        clearInterval(self.intervalId);
      }
      self.intervalId = null;
      self.isRunning = false;
    },
  }))
  .actions(self => ({
    reset() {
      self.stop();

      self.elapseTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      };
    },
  }))
  .actions(self => ({
    finish() {
      self.stop();

      if (self.task) {
        self.task.end(self.elapseTime);
        self.task = null;
      }

      if (self.project) {
        self.project = null;
      }

      self.reset();
    },
  }))
  .views(self => ({
    get getCurrentElapseTime(): string {
      return humanizeTime(self.elapseTime);
    },
  }));
