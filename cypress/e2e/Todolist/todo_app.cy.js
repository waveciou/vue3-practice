/// <reference types="cypress" />

describe('todo-app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/vue3-practice/#/todolist');
  });

  it('add todo', () => {
    const addedItem = 'aaa';

    cy.get('[data-test=todo-input]').type(`${addedItem}{enter}`);

    cy.get('[data-test=todo-list]')
      .should('have.length', 1)
      .last()
      .should('have.text', addedItem);
  });
});
