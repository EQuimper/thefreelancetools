import { Text } from 'evergreen-ui';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { store } from '@freelance-tool/models';

type P = {} & RouteComponentProps<NavParams>;

interface S {}

interface NavParams {
  id: string;
}

class Project extends React.Component<P, S> {
  render() {
    const project = store.projects.getProjectById(this.props.match.params.id);

    if (!project) {
      return <Redirect to="/projects" />;
    }
    return (
      <div>
        <Text>{project.name}</Text>
      </div>
    );
  }
}

export default Project;
