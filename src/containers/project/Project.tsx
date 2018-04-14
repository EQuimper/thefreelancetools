import { Text } from 'evergreen-ui';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { store } from '@freelance-tool/models';
import { humanizeTime } from '@freelance-tool/utils';

interface P extends RouteComponentProps<NavParams> {}

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

        <div>
          {project.tasks.map(el => (
            <div key={String(el.id)}>
              <p>Name: {el.name}</p>
              <p>Time: {el.elapsedTime}</p>
            </div>
          ))}
          <p>
            TotalTime:{' '}
            {`${humanizeTime(String(project.totalTime.hours))}:${humanizeTime(
              String(project.totalTime.minutes),
            )}:${humanizeTime(String(project.totalTime.seconds))}`}
          </p>
        </div>
      </div>
    );
  }
}

export default Project;
