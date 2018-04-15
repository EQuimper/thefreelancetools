import { FormikProps } from 'formik';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Project, store } from '@freelance-tool/models';
import { ProjectPriorityEnum } from '@freelance-tool/types';
import NewProjectForm from './NewProjectForm';

interface FormValues {
  name: string;
  description: string;
  priority: ProjectPriorityEnum;
}

interface NavParams {}

interface P extends RouteComponentProps<NavParams> {}

interface S {}

class NewProjectModal extends React.PureComponent<P, S> {
  _handleSubmit = (values: FormValues, bag: FormikProps<FormValues>) => {
    const project = Project.create({
      ...values,
    });

    store.projects.addProject(project);

    store.modalsManager.close();

    this.props.history.push(`/projects/${project.id}`);
  }

  render() {
    return <NewProjectForm handleSubmit={this._handleSubmit} />;
  }
}

export default withRouter(NewProjectModal);
