import { onSnapshot } from 'mobx-state-tree';

import { ModalTypeEnum } from '@freelance-tool/types';

import { ModalsManager } from './ModalsManager';

describe('ModalsManager model', () => {
  it('should create a instance of a model', () => {
    const modalsManager = ModalsManager.create();

    expect(modalsManager.isShow).toBe(false);
    expect(modalsManager.modalType).toBe(null);
  });

  it('should be able to open a modal with the modalType newProject', () => {
    const modalsManager = ModalsManager.create();

    const states: any[] = [];

    onSnapshot(modalsManager, snapshot => {
      states.push(snapshot);
    });

    modalsManager.open({
      modalType: ModalTypeEnum.NEW_PROJECT,
      modalTitle: 'New Project',
      params: null,
      confirmButtonLabel: 'Create Project',
    });

    expect(modalsManager.isShow).toBe(true);
    expect(modalsManager.modalType).toBe('newProject');

    expect(states).toMatchSnapshot();
  });

  it('should be able to close a modal', () => {
    const modalsManager = ModalsManager.create();

    const states: any[] = [];

    onSnapshot(modalsManager, snapshot => {
      states.push(snapshot);
    });

    modalsManager.open({
      modalType: ModalTypeEnum.NEW_PROJECT,
      modalTitle: 'New Project',
      params: null,
      confirmButtonLabel: 'Create Project',
    });

    modalsManager.close();

    expect(modalsManager.isShow).toBe(false);
    expect(modalsManager.modalType).toBe(null);

    expect(states).toMatchSnapshot();
  });
});
