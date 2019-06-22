import { getGreeting } from '../support/app.po';

describe('wallaby-poc-test', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to wallaby-poc-test!');
  });
});
