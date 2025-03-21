describe('Quiz End-to-End Test', () => {
    beforeEach(() => {
      // Intercept the API request and stub it with mock data
      cy.intercept('GET', '/api/questions', {
        statusCode: 200,
        body: [
          {
            question: 'What is 2 + 2?',
            answers: [
              { text: '3', isCorrect: false },
              { text: '4', isCorrect: true },
              { text: '5', isCorrect: false },
            ],
          },
          {
            question: 'What is the capital of France?',
            answers: [
              { text: 'Berlin', isCorrect: false },
              { text: 'Paris', isCorrect: true },
              { text: 'Madrid', isCorrect: false },
            ],
          },
        ],
      }).as('getQuestions');
  
      // Visit the quiz page
      cy.visit('/quiz'); // Adjust this based on your route
    });
  
    it('should display the Start Quiz button', () => {
      cy.contains('Start Quiz').should('be.visible');
    });
  
    it('should fetch and display the first question when Start Quiz is clicked', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      // Check if the first question is displayed
      cy.contains('What is 2 + 2?').should('be.visible');
    });
  
    it('should allow answering questions and progress through the quiz', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      // Answer the first question (correct answer: '4')
      cy.contains('4').click();
      cy.contains('What is the capital of France?').should('be.visible');
  
      // Answer the second question (correct answer: 'Paris')
      cy.contains('Paris').click();
      cy.contains('Quiz Completed').should('be.visible');
      cy.contains('Your score: 2/2').should('be.visible');
    });
  
    it('should allow restarting the quiz after completion', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      cy.contains('4').click();
      cy.contains('Paris').click();
      cy.contains('Quiz Completed').should('be.visible');
  
      cy.contains('Take New Quiz').click();
      cy.contains('Start Quiz').should('be.visible');
    });
  });