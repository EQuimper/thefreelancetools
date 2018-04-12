import { Button } from 'evergreen-ui';
import * as React from 'react';

import { store } from '@freelance-tool/models';
import { ModalTypeEnum } from '@freelance-tool/types';
// import styled from 'styled-components';

// const Root = styled.div`
//   display: grid;
// `;

class Projects extends React.PureComponent {
  state = {};
  _openNewProjectModal = () => {
    store.modalsManager.open({
      modalTitle: 'New Project',
      modalType: ModalTypeEnum.NEW_PROJECT,
      params: null,
    });
  }

  render() {
    return (
      <div>
        Hello world
        <Button onClick={this._openNewProjectModal}>Create New Project</Button>
      </div>
    );
  }
}

export default Projects;
