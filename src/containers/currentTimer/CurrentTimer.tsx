import * as format from 'date-fns/format';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

interface P {
  currentTimer: {
    elapseTime: number;
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
  render() {
    return (
      <div>
        <h5>
          ElapseTime{' '}
          {format(this.props.currentTimer.getCurrentElapseTime, 'mm:ss')}
        </h5>
        <button onClick={this.props.currentTimer.start}>Start</button>
        <button onClick={this.props.currentTimer.stop}>Stop</button>
        <button onClick={this.props.currentTimer.reset}>Reset</button>
      </div>
    );
  }
}

export default CurrentTimer;
