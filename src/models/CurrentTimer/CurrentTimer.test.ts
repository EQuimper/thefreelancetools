import { onSnapshot } from 'mobx-state-tree';

import { CurrentTimer } from '../CurrentTimer';

jest.useFakeTimers();

describe('CurrentTimer model', () => {
  it('should create a instance of a model', () => {
    const currentTimer = CurrentTimer.create({
      elapseTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    });

    expect(currentTimer.isRunning).toBe(false);
    expect(currentTimer.elapseTime).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(currentTimer.intervalId).toBe(null);
  });

  it('should be able to start', () => {
    const currentTimer = CurrentTimer.create({
      elapseTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    });

    currentTimer.start();

    expect(currentTimer.isRunning).toBe(true);
    expect(currentTimer.intervalId).toBe(1);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should be able to stop', () => {
    const currentTimer = CurrentTimer.create({
      elapseTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    });

    const states: any[] = [];

    onSnapshot(currentTimer, snapshot => {
      states.push(snapshot);
    });

    currentTimer.start();

    expect(setInterval).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();

    expect(currentTimer.elapseTime).not.toBe(0);

    currentTimer.stop();

    expect(currentTimer.isRunning).toBe(false);
    expect(currentTimer.intervalId).toBe(null);

    expect(states).toMatchSnapshot();
  });

  it('should be able to reset', () => {
    const currentTimer = CurrentTimer.create({
      elapseTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    });

    const states: any[] = [];

    onSnapshot(currentTimer, snapshot => {
      states.push(snapshot);
    });

    currentTimer.start();

    expect(setInterval).toHaveBeenCalledTimes(3);

    jest.runOnlyPendingTimers();

    expect(currentTimer.elapseTime).not.toBe(0);

    currentTimer.stop();

    expect(currentTimer.isRunning).toBe(false);
    expect(currentTimer.intervalId).toBe(null);

    currentTimer.start();

    jest.runOnlyPendingTimers();

    currentTimer.stop();

    currentTimer.reset();

    expect(states).toMatchSnapshot();
  });
});
