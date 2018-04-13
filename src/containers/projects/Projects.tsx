import { Button } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { store } from '@freelance-tool/models';
import { ModalTypeEnum } from '@freelance-tool/types';
// import styled from 'styled-components';

// const Root = styled.div`
//   display: grid;
// `;

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
      <div>
        Hello world!!
        <Button onClick={this._openNewProjectModal}>Create New Project</Button>
        <div>
          {projects.projects.map(el => (
            <div key={String(el.id)}>
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Projects;
