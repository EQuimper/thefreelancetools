import { Text } from 'evergreen-ui';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { store } from '@freelance-tool/models';

interface P {
  id: string;
}

interface S {}

class Project extends React.Component<RouteComponentProps<P>, S> {
  render() {
    const project = store.projects.getProjectById(this.props.match.params.id);

    if (!project) {
      return null;
    }
    return (
      <div>
        <Text>{project.name}</Text>
      </div>
    );
  }
}

export default Project;
