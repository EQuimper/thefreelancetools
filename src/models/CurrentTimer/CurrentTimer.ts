import { types } from 'mobx-state-tree';

export const CurrentTimer = types
  .model('CurrentTimer', {
    elapseTime: types.model({
      hours: 0,
      minutes: 0,
      seconds: 0,
    }),
    isRunning: false,
    intervalId: types.maybe(types.number),
  })
  .actions(self => ({
    updateElapseTime() {
      self.elapseTime.seconds += 1;

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
    start() {
      self.intervalId = Number(setInterval(self.updateElapseTime, 1000));
      self.isRunning = true;
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
      self.elapseTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    },
  }))
  .views(self => ({
    get getCurrentElapseTime() {
      return self.elapseTime;
    },
  }));
