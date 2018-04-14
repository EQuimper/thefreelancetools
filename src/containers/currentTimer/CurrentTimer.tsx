import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Combobox, Text, TextInput } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';

import { store, Task } from '@freelance-tool/models';
import { IconEnum } from '@freelance-tool/types';

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

  _handleStart = () => {
    const getId = R.pathOr('', ['selectedProject', 'value']);

    const project = store.projects.getProjectById(getId(this.state));

    if (project) {
      const task = Task.create({
        name: this.state.taskName,
        elapsedTime: {
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
        },
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
          placeholder="Task name"
          onChange={(e: InputEvent) =>
            this.setState({ taskName: e.target.value })
          }
          value={this.state.taskName}
        />
        <br />
        <br />

        <Text>ElapseTime {currentTimer.getCurrentElapseTime}</Text>
        {currentTimer.isRunning ? (
          <Button
            appearance="ghost"
            marginLeft={12}
            onClick={currentTimer.stop}
          >
            <FontAwesomeIcon size="2x" icon={IconEnum.PAUSE} />
          </Button>
        ) : (
          <Button
            appearance="ghost"
            marginLeft={12}
            onClick={this._handleStart}
          >
            <FontAwesomeIcon size="2x" icon={IconEnum.PLAY} />
          </Button>
        )}

        <Button
          marginLeft={12}
          appearance="ghost"
          onClick={currentTimer.finish}
        >
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
