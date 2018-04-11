import { ModalsManager } from './ModalsManager';

describe('ModalsManager model', () => {
  it('should create a instance of a model', () => {
    const modalsManager = ModalsManager.create();

    expect(modalsManager.isShow).toBe(false);
    expect(modalsManager.modalType).toBe(null);
  });
});
