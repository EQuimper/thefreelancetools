import { toaster } from 'evergreen-ui';
import { destroy, getParent, types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

export const Project = types
  .model('Project', {
    id: types.optional(types.identifier(), () => uuid()),
    name: types.string,
    description: types.string,
  })
  .actions(self => ({
    remove() {
      getParent(self, 2).remove(self);
    },
  }))
  .actions(self => ({
    updateName(name: string) {
      self.name = name;
    },
  }))
  .actions(self => ({
    updateDescription(description: string) {
      self.description = description;
    },
  }))
  .actions(() => ({
    afterCreate() {
      toaster.success('Project successfully created!');
    },
  }));

export const Projects = types
  .model('Projects', {
    projects: types.optional(types.array(Project), []),
  })
  .actions(self => ({
    addProject(project: typeof Project.Type) {
      self.projects.push(project);
    },
  }))
  .actions(self => ({
    remove(project: typeof Project.Type) {
      destroy(project);
    },
  }))
  .views(self => ({
    get totalProjectsAmount() {
      return self.projects.length;
    },
  }));
