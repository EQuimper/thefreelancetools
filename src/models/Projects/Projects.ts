import { toaster } from 'evergreen-ui';
import { destroy, getParent, types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

import { ProjectPriorityEnum } from '@freelance-tool/types';

export const Project = types
  .model('Project', {
    id: types.optional(types.identifier(), () => uuid()),
    name: types.string,
    description: types.string,
    priority: types.enumeration('Priority', ['HIGH', 'MEDIUM', 'LOW']),
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
  .actions(self => ({
    updatePriority(priority: ProjectPriorityEnum) {
      self.priority = priority;
    },
  }))
  .actions(() => ({
    afterCreate() {
      toaster.success('Project successfully created!');
    },
  }));

export const Projects = types
  .model('Projects', {
    projects: types.optional(types.map(Project), {}),
  })
  .actions(self => ({
    addProject(project: typeof Project.Type) {
      self.projects.put(project);
    },
  }))
  .actions(self => ({
    remove(project: typeof Project.Type) {
      destroy(project);
    },
  }))
  .views(self => ({
    get totalProjectsAmount() {
      return self.projects.size;
    },
  }))
  .views(self => ({
    getProjectById(id: string) {
      return self.projects.get(id);
    },
  }))
  .views(self => ({
    get getProjects() {
      return self.projects;
    },
  }));
