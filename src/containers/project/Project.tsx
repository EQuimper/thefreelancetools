import { Text } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { store } from '@freelance-tool/models';
import { humanizeTime } from '@freelance-tool/utils';

interface P extends RouteComponentProps<NavParams> {}

interface S {}

interface NavParams {
  id: string;
}

@observer
class Project extends React.Component<P, S> {
  render() {
    const project = store.projects.getProjectById(this.props.match.params.id);

    if (!project) {
      return <Redirect to="/projects" />;
    }

    return (
      <div>
        <Text>{project.name}</Text>

        <div>
          {project.tasks.map(el => (
            <div key={String(el.id)}>
              <p>Name: {el.name}</p>
              <p>Time: {humanizeTime(el.elapsedTime)}</p>
            </div>
          ))}
          <p>TotalTime: {humanizeTime(project.totalTime)}</p>
        </div>
      </div>
    );
  }
}

export default Project;
