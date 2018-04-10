import { types } from 'mobx-state-tree';

export const CurrentTimer = types
  .model('CurrentTimer', {
    elapseTime: 0,
    isRunning: false,
    intervalId: types.maybe(types.number),
  })
  .actions(self => ({
    start() {
      // @ts-ignore
      self.intervalId = Number(setInterval(self.updateElapseTime, 1000));
      self.isRunning = true;
    },
    stop() {
      if (self.intervalId) {
        clearInterval(self.intervalId);
      }
      self.intervalId = null;
      self.isRunning = false;
    },
    reset() {
      self.elapseTime = 0;
    },
    updateElapseTime() {
      self.elapseTime += 1;
    },
  }))
  .views(self => ({
    get getCurrentElapseTime() {
      return self.elapseTime;
    },
  }));
