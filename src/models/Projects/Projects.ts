import { destroy, getParent, types } from 'mobx-state-tree';

export const Project = types
  .model('Project', {
    id: types.identifier(),
    name: types.string,
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
