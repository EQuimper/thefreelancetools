import { Button } from 'evergreen-ui';
import * as React from 'react';

import { store } from '../../models';
import { ModalTypeEnum } from '../../types';
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
      confirmButtonLabel: 'Create Project',
    });
  }

  render() {
    return (
      <div>
        Hello
        <Button onClick={this._openNewProjectModal}>Create New Project</Button>
      </div>
    );
  }
}

export default Projects;
