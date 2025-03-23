const NUM_QUESTIONS = 4;

describe('Quiz End-to-End Test', () => {
  beforeEach(() => {
    // Visit the quiz page
    cy.visit('/'); // Adjust this based on your route
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json',
    }).as('getQuestions');

    
  });

  it('should display the Start Quiz button', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should display the first question when Start Quiz is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Check if the first Python-related question is displayed
    cy.get('h2').should('be.visible');
  });

  it('should allow answering questions and progress through the quiz', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    for(let i = 0; i < NUM_QUESTIONS; i++) {
      cy.get('h2').should('be.visible');
      cy.get('button').first().click(); 

    }//FOR LOOP


    // Answer the fourth question (correct answer: 'class MyClass:')
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score').should('be.visible');
  });

  it('should allow restarting the quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    for(let i = 0; i < NUM_QUESTIONS; i++) {
      cy.get('h2').should('be.visible');
      cy.get('button').first().click(); 

    }//FOR LOOP

  
    cy.contains('Quiz Completed').should('be.visible');

    cy.contains('Take New Quiz').click();
    cy.get('h2').should('be.visible');
  });
});