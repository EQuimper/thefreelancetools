import { Button, Combobox, Text, TextInput } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';

import { store, Task } from '@freelance-tool/models';
import { humanizeTime } from '@freelance-tool/utils';

interface OptionItem {
  label: string;
  value: string;
}

interface P {}

interface S {
  selectedProject: OptionItem | null;
  taskName: string;
}

@observer
class CurrentTimer extends React.Component<P, S> {
  state = {
    selectedProject: null,
    taskName: '',
  };

  _getTime() {
    const { elapseTime } = store.currentTimer;

    const hours = humanizeTime(String(elapseTime.hours));
    const minutesStr = humanizeTime(String(elapseTime.minutes));
    const secondsStr = humanizeTime(String(elapseTime.seconds));

    return `${hours}:${minutesStr}:${secondsStr}`;
  }

  _handleStart = () => {
    const getId = R.pathOr('', ['selectedProject', 'value']);

    const project = store.projects.getProjectById(getId(this.state));

    if (project) {
      const task = Task.create({
        name: this.state.taskName,
      });

      project.addTask(task);
      store.currentTimer.start(project, task);
    }
  }

  _handleProjectChange = (value: OptionItem) => {
    this.setState({
      selectedProject: value,
    });
  }

  render() {
    const { currentTimer, projects } = store;

    return (
      <div>
        <Combobox
          placeholder="Project"
          autocompleteProps={{
            title: 'Project Name',
            itemsFilter: (items: OptionItem[], input: string) =>
              items.filter(el => el.label.includes(input)),
          }}
          openOnFocus
          items={projects.getProjectsOptions}
          onChange={this._handleProjectChange}
          itemToString={(i: OptionItem) => (i ? i.label : '')}
          selectedItem={this.state.selectedProject}
        />

        <br />
        <br />
        <TextInput
          onChange={(e: InputEvent) => this.setState({ taskName: e.target.value })}
          value={this.state.taskName}
        />
        <br />
        <br />

        <Text>ElapseTime {this._getTime()}</Text>
        <Button appearance="green" onClick={this._handleStart}>
          Start
        </Button>
        <Button marginLeft={12} appearance="red" onClick={currentTimer.stop}>
          Stop
        </Button>
        <Button marginLeft={12} appearance="ghost" onClick={currentTimer.finish}>
          Finish
        </Button>
        <Button
          marginLeft={12}
          appearance="ghostBlue"
          onClick={currentTimer.reset}
        >
          Reset
        </Button>
      </div>
    );
  }
}

export default CurrentTimer;
