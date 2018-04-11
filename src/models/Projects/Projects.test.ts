import { onPatch, onSnapshot } from 'mobx-state-tree';

import { Project, Projects } from './Projects';

describe('Project model', () => {
  it('should create a instance of a model', () => {
    const name = 'My Project';
    const myProject = Project.create({ name, id: '123' });

    expect(myProject.name).toBe(name);
  });

  it('should be able to update the name', () => {
    const name = 'My Project';
    const myProject = Project.create({ name, id: '123' });
    const updatedName = 'Hello World';
    const patches: any[] = [];

    onPatch(myProject, patch => {
      patches.push(patch);
    });

    expect(myProject.name).toBe(name);

    myProject.updateName(updatedName);

    expect(patches).toMatchSnapshot();
  });
});

describe('Projects model', () => {
  it('should create a instance of a model', () => {
    const projects = Projects.create();

    expect(projects.projects.length).toBe(0);
  });

  it('should be able to add new project when create', () => {
    const projects = Projects.create();
    const states: any[] = [];
    const name = 'My Project';
    const myProject = Project.create({ name, id: '123' });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({ name: name2, id: '456' });

    onSnapshot(projects, snapshot => {
      states.push(snapshot);
    });

    projects.addProject(myProject);

    expect(projects.projects.length).toBe(1);
    expect(projects.projects[0].name).toBe(name);

    projects.addProject(myProject2);

    expect(projects.projects.length).toBe(2);
    expect(projects.projects[1].name).toBe(name2);

    expect(states).toMatchSnapshot();
  });

  it('should be able to get a computed value of the amount of projects', () => {
    const projects = Projects.create();
    const name = 'My Project';
    const myProject = Project.create({ name, id: '123' });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({ name: name2, id: '456' });

    projects.addProject(myProject);

    expect(projects.totalProjectsAmount).toBe(1);

    projects.addProject(myProject2);

    expect(projects.totalProjectsAmount).toBe(2);
  });

  it('should be able to remove a project', () => {
    const projects = Projects.create();
    const states: any[] = [];
    const name = 'My Project';
    const myProject = Project.create({ name, id: '123' });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({ name: name2, id: '456' });

    onSnapshot(projects, snapshot => {
      states.push(snapshot);
    });

    projects.addProject(myProject);
    projects.addProject(myProject2);

    expect(projects.projects.length).toBe(2);

    myProject.remove();

    expect(projects.projects.length).toBe(1);

    expect(states).toMatchSnapshot();
  });
});
