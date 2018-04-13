import { onPatch, onSnapshot } from 'mobx-state-tree';

import { Project, Projects } from './Projects';

describe('Project model', () => {
  it('should create a instance of a model', () => {
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({ name, id: '123', description });

    expect(myProject.name).toBe(name);
    expect(myProject.description).toBe(description);
  });

  it('should be able to update the name', () => {
    const name = 'My Project';
    const description = 'This is a description';
    const myProject = Project.create({ name, id: '123', description });
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
    const myProject = Project.create({ name, id: '123', description });
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
    const description = 'This is a description';
    const myProject = Project.create({ name, id: '123', description });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({ name: name2, id: '456', description });

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
    const description = 'This is a description';
    const myProject = Project.create({ name, id: '123', description });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({ name: name2, id: '456', description });

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
    const myProject = Project.create({ name, id: '123', description });
    const name2 = 'My Second Project';
    const myProject2 = Project.create({ name: name2, id: '456', description });

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
