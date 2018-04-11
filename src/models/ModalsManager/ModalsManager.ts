import { types } from 'mobx-state-tree';

import { ModalTypeEnum } from '../../types';

export const ModalsManager = types
  .model('ModalsManager', {
    isShow: false,
    modalType: types.maybe(types.enumeration('modalType', ['newProject'])),
  })
  .actions(self => ({
    open(modalType: ModalTypeEnum) {
      self.isShow = true;
      self.modalType = modalType;
    },
  }))
  .actions(self => ({
    close() {
      self.isShow = false;
      self.modalType = null;
    },
  }));
