import { inject, observer } from 'mobx-react';
import * as React from 'react';

const humanizeTime = (time: string): string => {
  if (time.length === 1) {
    return `0${time}`;
  }

  return time;
};

interface P {
  currentTimer: {
    elapseTime: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    isRunning: boolean;
    intervalId: number | null;
    start: () => void;
    stop: () => void;
    reset: () => void;
    getCurrentElapseTime: number;
  };
}

interface S {}

@inject('currentTimer')
@observer(['currentTimer'])
class CurrentTimer extends React.Component<P, S> {
  state = {};

  _getTime() {
    const { elapseTime } = this.props.currentTimer;

    const hours = humanizeTime(String(elapseTime.hours));
    const minutesStr = humanizeTime(String(elapseTime.minutes));
    const secondsStr = humanizeTime(String(elapseTime.seconds));

    return `${hours}:${minutesStr}:${secondsStr}`;
  }

  render() {
    const { currentTimer } = this.props;
    return (
      <div>
        <h5>ElapseTime {this._getTime()}</h5>
        <button onClick={currentTimer.start}>Start</button>
        <button onClick={currentTimer.stop}>Stop</button>
        <button onClick={currentTimer.reset}>Reset</button>
      </div>
    );
  }
}

export default CurrentTimer;
