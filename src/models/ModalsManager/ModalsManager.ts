import { types } from 'mobx-state-tree';

import { ModalTypeEnum } from '@freelance-tool/types';

interface ModalOpen {
  modalType: ModalTypeEnum;
  modalTitle?: string;
  params: Object | null;
  confirmButtonLabel?: string;
}

export const ModalsManager = types
  .model('ModalsManager', {
    isShow: false,
    modalType: types.maybe(types.enumeration('modalType', ['newProject'])),
    modalTitle: types.maybe(types.string),
    confirmButtonLabel: types.maybe(types.string),
    params: types.optional(types.frozen, null),
  })
  .actions(self => ({
    open({ modalType, modalTitle, params, confirmButtonLabel }: ModalOpen) {
      self.isShow = true;
      self.modalType = modalType;
      self.params = params;

      if (modalTitle) {
        self.modalTitle = modalTitle;
      }

      if (confirmButtonLabel) {
        self.confirmButtonLabel = confirmButtonLabel;
      }
    },
  }))
  .actions(self => ({
    close() {
      self.isShow = false;
      self.modalType = null;
      self.modalTitle = null;
      self.params = null;
      self.confirmButtonLabel = null;
    },
  }));
