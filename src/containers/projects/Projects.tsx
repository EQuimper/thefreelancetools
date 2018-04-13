import { Button, Text } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { ProjectCard } from '@freelance-tool/components';
import { store } from '@freelance-tool/models';
import { ModalTypeEnum } from '@freelance-tool/types';

const Root = styled.div`
  display: grid;
  grid-template-rows: 70px auto;
  grid-gap: 20px;
  padding: 0px 16px 40px;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(200px, auto);
`;

interface P {}

interface S {}

@observer
class Projects extends React.Component<RouteComponentProps<P>, S> {
  state = {};
  _openNewProjectModal = () => {
    store.modalsManager.open({
      modalTitle: 'New Project',
      modalType: ModalTypeEnum.NEW_PROJECT,
      params: null,
    });
  }

  _onCardPress = (id: string) => {
    this.props.history.push(`/projects/${id}`);
  }

  render() {
    const { projects } = store;
    return (
      <Root>
        <TopWrapper>
          <Text size={900}>My Projects</Text>
          <Button height={38} onClick={this._openNewProjectModal}>
            Create New Project
          </Button>
        </TopWrapper>
        <Grid>
          {projects.projects.map(el => (
            <ProjectCard
              onCardPress={this._onCardPress}
              {...el}
              key={String(el.id)}
              id={String(el.id)}
            />
          ))}
        </Grid>
      </Root>
    );
  }
}

export default Projects;
