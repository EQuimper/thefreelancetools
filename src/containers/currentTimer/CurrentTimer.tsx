import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Combobox,
  FormField,
  Text,
  TextInput,
  toaster,
} from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';

import { styled } from '@freelance-tool/commons';
import { store, Task } from '@freelance-tool/models';
import { IconEnum, SidebarIconEnum } from '@freelance-tool/types';

const Root = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr 1fr auto;
  grid-auto-columns: minmax(100%, auto);
  grid-row-gap: 40px;
  justify-self: center;
  align-self: center;
  padding: 0px 16px 40px;
`;

const TopWrapper = styled.div`
  display: grid;
  justify-self: center;
  align-self: center;
  padding-top: 20px;
  grid-row-gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #364f65;
  margin-right: 10px;
`;

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
    } else {
      toaster.danger('Must provided a project');
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
      <Root>
        <TitleWrapper>
          <div>
            <Icon icon={SidebarIconEnum.PROJECTS} size="2x" />
            <Text size={900}>Time Tracker</Text>
          </div>
        </TitleWrapper>
        <TopWrapper>
          <FormField label="Project name" isRequired>
            <Combobox
              placeholder="Project"
              width={400}
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
          </FormField>
          <FormField label="Task name" isRequired>
            <TextInput
              width={400}
              placeholder="Task name"
              onChange={(e: InputEvent) =>
                this.setState({ taskName: e.target.value })
              }
              value={this.state.taskName}
            />
          </FormField>
        </TopWrapper>

        <Text>ElapseTime {currentTimer.getCurrentElapseTime}</Text>
        <div>
          {currentTimer.isRunning ? (
            <Button appearance="ghost" onClick={currentTimer.stop} height={40}>
              <FontAwesomeIcon size="3x" icon={IconEnum.PAUSE} />
            </Button>
          ) : (
            <Button appearance="ghost" onClick={this._handleStart} height={40}>
              <FontAwesomeIcon size="3x" icon={IconEnum.PLAY} />
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
      </Root>
    );
  }
}

export default CurrentTimer;
