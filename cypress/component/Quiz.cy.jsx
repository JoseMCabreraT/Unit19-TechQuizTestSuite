import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';



describe('Quiz Component', () => {
  beforeEach(() => {
    // Stub the API call to return mock questions
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json',
    }).as('getQuestions');

    // Mount the Quiz component
    mount(<Quiz />);
  });

  it('should display the start button initially', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and load the first question on clicking Start Quiz', () => {
    cy.contains('Start Quiz').click();
    cy.get('h2').should('be.visible');
  });

  it('should allow answering questions and progress through the quiz', () => {
    cy.contains('Start Quiz').click();

    // Answer the first question
    cy.contains('4').click();
    cy.get('h2').should('be.visible');

    // Answer the second question
    cy.contains('Paris').click();
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains(`Your score: 2/2`).should('be.visible');
  });

  it('should allow restarting the quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.contains('4').click();
    cy.contains('Paris').click();

    cy.contains('Take New Quiz').click();
    cy.contains('Start Quiz').should('be.visible');
  });
});