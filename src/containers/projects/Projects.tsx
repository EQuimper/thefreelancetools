import { Button, Pane, Text } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

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

const Card = styled(Pane).attrs({
  appearance: 'tint3',
  elevation: 1,
  hoverElevation: 3,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
`;

@observer
class Projects extends React.Component {
  state = {};
  _openNewProjectModal = () => {
    store.modalsManager.open({
      modalTitle: 'New Project',
      modalType: ModalTypeEnum.NEW_PROJECT,
      params: null,
    });
  }

  render() {
    const { projects } = store;
    return (
      <Root>
        <TopWrapper>
          <Text size={900}>My Project</Text>
          <Button height={38} onClick={this._openNewProjectModal}>
            Create New Project
          </Button>
        </TopWrapper>
        <Grid>
          {projects.projects.map(el => (
            <Card key={String(el.id)}>
              <p>{el.name}</p>
            </Card>
          ))}
        </Grid>
      </Root>
    );
  }
}

export default Projects;
