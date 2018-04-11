import { types } from 'mobx-state-tree';

export const ModalsManager = types.model('ModalsManager', {
  isShow: false,
  modalType: types.maybe(types.enumeration('modalType', ['newProject'])),
});
