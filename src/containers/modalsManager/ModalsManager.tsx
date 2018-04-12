import { Dialog } from 'evergreen-ui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { NewProjectModal } from '@freelance-tool/components';
import { store } from '@freelance-tool/models';

import { ModalTypeEnum } from '../../types';
// import styled from 'styled-components';

// const Root = styled.div`
//   display: grid;
// `;

interface P {}

interface S {}

@observer
class ModalsManager extends React.Component<P, S> {
  state = {};

  _renderModal = () => {
    switch (store.modalsManager.modalType) {
      case ModalTypeEnum.NEW_PROJECT:
        return <NewProjectModal />;
      default:
        // Need to pass a div cause Dialog required a children
        return <div />;
    }
  }
  render() {
    const { modalsManager } = store;
    return (
      <Dialog
        isShown={modalsManager.isShow}
        title={modalsManager.modalTitle}
        hasHeader={!!modalsManager.modalTitle}
        onCloseComplete={modalsManager.close}
        confirmLabel={modalsManager.confirmButtonLabel}
        hasFooter={!!modalsManager.confirmButtonLabel}
      >
        {this._renderModal()}
      </Dialog>
    );
  }
}

export default ModalsManager;
