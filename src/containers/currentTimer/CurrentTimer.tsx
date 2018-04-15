import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Combobox, FormField, Text, toaster } from 'evergreen-ui';
import { Formik, FormikProps } from 'formik';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';
import * as Yup from 'yup';

import { styled, TextInput } from '@freelance-tool/commons';
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

const TopWrapper = styled.form`
  display: grid;
  justify-self: center;
  align-self: center;
  padding-top: 20px;
  grid-row-gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #364f65;
  margin-right: 10px;
`;

interface OptionItem {
  label: string;
  value: string;
}

interface FormValuesType {
  projectName: OptionItem | null;
  taskName: string;
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

  _handleSubmit = (
    values: FormValuesType,
    bag: FormikProps<FormValuesType>,
  ) => {
    if (values.projectName) {
      const project = store.projects.getProjectById(values.projectName.value);

      if (project) {
        const task = Task.create({
          name: values.taskName,
          elapsedTime: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
          },
        });

        project.addTask(task);
      }
    }
  }

  render() {
    const { currentTimer, projects } = store;

    return (
      <Root>
        <TitleWrapper>
          <div>
            <Icon icon={SidebarIconEnum.TIME_TRACKER} size="2x" />
            <Text size={900}>Time Tracker</Text>
          </div>
          <Text size={600}>
            Elapse Time {currentTimer.getCurrentElapseTime}
          </Text>
        </TitleWrapper>
        <Formik
          validationSchema={Yup.object().shape({
            projectName: Yup.object()
              .shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
              })
              .required(),
            taskName: Yup.string().required('Task name is required'),
          })}
          initialValues={{
            projectName: null,
            taskName: '',
          }}
          onSubmit={this._handleSubmit}
          render={({
            values,
            isValid,
            isSubmitting,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            handleSubmit,
          }: FormikProps<FormValuesType>) => (
            <TopWrapper onSubmit={handleSubmit}>
              <FormField label="Project name" isRequired>
                <Combobox
                  placeholder="Project"
                  width={400}
                  autocompleteProps={{
                    title: 'Project Name',
                    itemsFilter: (items: OptionItem[], input: string) =>
                      items.filter(el =>
                        el.label.toLowerCase().includes(input.toLowerCase()),
                      ),
                  }}
                  openOnFocus
                  items={projects.getProjectsOptions}
                  onChange={(value: OptionItem) =>
                    setFieldValue('projectName', value)
                  }
                  itemToString={(i: OptionItem) => (i ? i.label : '')}
                  selectedItem={values.projectName}
                />
              </FormField>

              <TextInput
                label="Task name"
                isRequired
                name="taskName"
                placeholder="Task name"
                handleChange={setFieldValue}
                value={values.taskName}
                isInvalid={!!(errors.taskName && touched.taskName)}
                handleBlur={setFieldTouched}
                disabled={isSubmitting}
                errorMessage={errors.taskName}
              />

              <Button
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                appearance="green"
                type="submit"
              >
                Create Task
              </Button>
            </TopWrapper>
          )}
        />

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
