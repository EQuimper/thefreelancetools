import { onPatch, onSnapshot } from 'mobx-state-tree';

import { ProjectPriorityEnum } from '@freelance-tool/types';

import { Project, Projects, Task } from './Projects';

describe('Project model', () => {
  it('should create a instance of a model', () => {
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });

    expect(myProject.name).toBe(name);
    expect(myProject.description).toBe(description);
  });

  it('should be able to update the name', () => {
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });
    const updatedName = 'Hello World';
    const patches: any[] = [];

    onPatch(myProject, patch => {
      patches.push(patch);
    });

    expect(myProject.name).toBe(name);

    myProject.updateName(updatedName);

    expect(myProject.name).toBe(updatedName);

    expect(patches).toMatchSnapshot();
  });

  it('should be able to update the description', () => {
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });
    const updatedDescription = 'Hello World';
    const patches: any[] = [];

    onPatch(myProject, patch => {
      patches.push(patch);
    });

    expect(myProject.description).toBe(description);

    myProject.updateDescription(updatedDescription);

    expect(myProject.description).toBe(updatedDescription);

    expect(patches).toMatchSnapshot();
  });

  it('should be able to update the priority', () => {
    const name = 'My Project';
    const description = 'This is a description';
    const priority = ProjectPriorityEnum.LOW;
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority,
    });

    const updatedPriority = ProjectPriorityEnum.HIGH;
    const patches: any[] = [];

    onPatch(myProject, patch => {
      patches.push(patch);
    });

    expect(myProject.priority).toBe(priority);

    myProject.updatePriority(updatedPriority);

    expect(myProject.priority).toBe(updatedPriority);

    expect(patches).toMatchSnapshot();
  });

  it('should return the totalTime for the tasks', () => {
    const project = Project.create({
      name: 'My Project',
      description: 'Description',
      id: '123',
      priority: ProjectPriorityEnum.HIGH,
    });

    const task1 = Task.create({
      name: 'task1',
      id: 'task1',
      elapsedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      },
    });

    const task2 = Task.create({
      name: 'task2',
      id: 'task2',
      elapsedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      },
    });

    const task3 = Task.create({
      name: 'task3',
      id: 'task3',
      elapsedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      },
    });

    task1.end({
      hours: 0,
      minutes: 10,
      seconds: 10,
      totalSeconds: 10 * 60 + 10,
    });
    task2.end({
      hours: 1,
      minutes: 15,
      seconds: 10,
      totalSeconds: 1 * 60 * 60 + 15 * 60 + 10,
    });
    task3.end({
      hours: 2,
      minutes: 0,
      seconds: 0,
      totalSeconds: 2 * 60 * 60,
    });

    project.addTask(task1);
    project.addTask(task2);
    project.addTask(task3);

    expect(project.totalTime).toEqual({
      hours: 3,
      minutes: 25,
      seconds: 20,
      totalSeconds: 12320,
    });
  });
});

describe('Projects model', () => {
  it('should create a instance of a model', () => {
    const projects = Projects.create();

    expect(projects.projects.size).toBe(0);
  });

  it('should return a project by id when call getProjectById', () => {
    const projects = Projects.create();

    const id = '123';
    const name = 'A project';
    const description = 'A description';
    const priority = ProjectPriorityEnum.HIGH;

    const myProject = Project.create({
      id,
      name,
      description,
      priority,
    });

    projects.addProject(myProject);

    expect(projects.getProjectById(id)).toEqual(myProject);
  });

  it('should be able to add new project when create', () => {
    const projects = Projects.create();
    const states: any[] = [];
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({
      name: name2,
      id: '456',
      description,
      priority: ProjectPriorityEnum.LOW,
    });

    onSnapshot(projects, snapshot => {
      states.push(snapshot);
    });

    projects.addProject(myProject);

    expect(projects.projects.size).toBe(1);

    expect(projects.getProjectById(String(myProject.id))).toEqual(myProject);

    projects.addProject(myProject2);

    expect(projects.projects.size).toBe(2);

    expect(projects.getProjectById(String(myProject2.id))).toEqual(myProject2);

    expect(states).toMatchSnapshot();
  });

  it('should be able to get a computed value of the amount of projects', () => {
    const projects = Projects.create();
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({
      name: name2,
      id: '456',
      description,
      priority: ProjectPriorityEnum.LOW,
    });

    projects.addProject(myProject);

    expect(projects.totalProjectsAmount).toBe(1);

    projects.addProject(myProject2);

    expect(projects.totalProjectsAmount).toBe(2);
  });

  it('should be able to remove a project', () => {
    const projects = Projects.create();
    const states: any[] = [];
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({
      name: name2,
      id: '456',
      description,
      priority: ProjectPriorityEnum.LOW,
    });

    onSnapshot(projects, snapshot => {
      states.push(snapshot);
    });

    projects.addProject(myProject);
    projects.addProject(myProject2);

    expect(projects.projects.size).toBe(2);

    myProject.remove();

    expect(projects.projects.size).toBe(1);

    expect(states).toMatchSnapshot();
  });

  it('should return an Array of { label, id } when call getProjectsOptions', () => {
    const projects = Projects.create();
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({
      name,
      id: '123',
      description,
      priority: ProjectPriorityEnum.LOW,
    });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({
      name: name2,
      id: '456',
      description,
      priority: ProjectPriorityEnum.LOW,
    });

    projects.addProject(myProject);
    projects.addProject(myProject2);

    expect(projects.getProjectsOptions.length).toBe(2);
    expect(projects.getProjectsOptions).toEqual([
      {
        label: name,
        value: '123',
      },
      {
        label: name2,
        value: '456',
      },
    ]);
  });
});
