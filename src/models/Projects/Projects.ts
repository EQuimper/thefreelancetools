import { toaster } from 'evergreen-ui';
import { destroy, getParent, types } from 'mobx-state-tree';
import * as uuid from 'uuid/v4';

import { ProjectPriorityEnum } from '@freelance-tool/types';

interface ElapsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export const Task = types
  .model('Task', {
    id: types.optional(types.identifier(), () => uuid()),
    elapsedTime: types.model({
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    }),
    startAt: types.maybe(types.Date),
    endAt: types.maybe(types.Date),
    name: types.string,
  })
  .actions(self => ({
    end(elapsedTime: ElapsedTime) {
      self.endAt = new Date();

      self.elapsedTime = {
        hours: elapsedTime.hours,
        minutes: elapsedTime.minutes,
        seconds: elapsedTime.seconds,
        totalSeconds: elapsedTime.totalSeconds,
      };
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.startAt = new Date();
    },
  }));

export const Project = types
  .model('Project', {
    id: types.optional(types.identifier(), () => uuid()),
    name: types.string,
    description: types.string,
    priority: types.enumeration('priority', ['HIGH', 'MEDIUM', 'LOW']),
    tasks: types.optional(types.array(Task), []),
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
  .actions(self => ({
    addTask(task: typeof Task.Type) {
      self.tasks.push(task);
    },
  }))
  .actions(() => ({
    afterCreate() {
      toaster.success('Project successfully created!');
    },
  }))
  .views(self => ({
    get totalTime(): ElapsedTime {
      return self.tasks.reduce(
        (acc, currentValue) => {
          return {
            hours: currentValue.elapsedTime.hours + acc.hours,
            minutes: currentValue.elapsedTime.minutes + acc.minutes,
            seconds: currentValue.elapsedTime.seconds + acc.seconds,
            totalSeconds:
              currentValue.elapsedTime.totalSeconds + acc.totalSeconds,
          };
        },
        {
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
        },
      );
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
  }))
  .views(self => ({
    get getProjectsOptions(): Array<{ label: string; value: string }> {
      const options: Array<{ label: string; value: string }> = [];

      self.projects.forEach((val, key) => {
        options.push({
          value: key,
          label: val.name,
        });
      });

      return options;
    },
  }));
