import { onSnapshot } from 'mobx-state-tree';

import { CurrentTimer } from '../CurrentTimer';
import { Project, Task } from '../Projects';

jest.useFakeTimers();

describe('CurrentTimer model', () => {
  let task: typeof Task.Type;
  let project: typeof Project.Type;

  beforeEach(() => {
    task = Task.create({
      name: 'My Task',
      id: '999',
    });

    project = Project.create({
      id: '123',
      name: 'My Project',
      description: 'A description',
      priority: 'HIGH',
    });
  });
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

    currentTimer.start(project, task);

    expect(currentTimer.isRunning).toBe(true);
    expect(currentTimer.intervalId).toBe(5);
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

    currentTimer.start(project, task);

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

    currentTimer.start(project, task);

    expect(setInterval).toHaveBeenCalledTimes(3);

    jest.runOnlyPendingTimers();

    expect(currentTimer.elapseTime).not.toBe(0);

    currentTimer.stop();

    expect(currentTimer.isRunning).toBe(false);
    expect(currentTimer.intervalId).toBe(null);

    currentTimer.start(project, task);

    jest.runOnlyPendingTimers();

    currentTimer.stop();

    currentTimer.reset();

    expect(states).toMatchSnapshot();
  });
});
