import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Text } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { styled } from '@freelance-tool/commons';
import { ProjectCard } from '@freelance-tool/components';
import { store } from '@freelance-tool/models';
import { ModalTypeEnum, SidebarIconEnum } from '@freelance-tool/types';

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

const Icon = styled(FontAwesomeIcon)`
  color: #364f65;
  margin-right: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(200px, auto);
`;

interface NavParams {}

interface P extends RouteComponentProps<NavParams> {}

interface S {}

@observer
class Projects extends React.Component<P, S> {
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
          <div>
            <Icon icon={SidebarIconEnum.PROJECTS} size="2x" />
            <Text size={900}>My Projects</Text>
          </div>
          <Button height={38} onClick={this._openNewProjectModal}>
            Create New Project
          </Button>
        </TopWrapper>
        <Grid>
          {Array.from(projects.getProjects).map(([key, value]) => (
            <ProjectCard
              onClick={this._onCardPress}
              {...value}
              key={key}
              id={key}
            />
          ))}
        </Grid>
      </Root>
    );
  }
}

export default Projects;
