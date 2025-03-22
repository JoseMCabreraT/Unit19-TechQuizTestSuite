import questions from '../fixtures/questions.json';

describe('Quiz End-to-End Test', () => {
  beforeEach(() => {
    
    cy.intercept('GET', '/api/questions', {
      statusCode: 200,
      body: [
        {
          question: 'What is the output of print(2 + 3)?',
          answers: [
            { text: '23', isCorrect: false },
            { text: '5', isCorrect: true },
            { text: 'Error', isCorrect: false },
          ],
        },
        {
          question: 'Which of the following is used to define a function in Python?',
          answers: [
            { text: 'def', isCorrect: true },
            { text: 'function', isCorrect: false },
            { text: 'define', isCorrect: false },
          ],
        },
        {
          question: 'What data type is used to store a sequence of characters in Python?',
          answers: [
            { text: 'List', isCorrect: false },
            { text: 'String', isCorrect: true },
            { text: 'Integer', isCorrect: false },
          ],
        },
        {
          question: 'What is the correct syntax to create a class in Python?',
          answers: [
            { text: 'class MyClass:', isCorrect: true },
            { text: 'create MyClass:', isCorrect: false },
            { text: 'function MyClass:', isCorrect: false },
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

  it('should fetch and display the first Python-related question when Start Quiz is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Check if the first Python-related question is displayed
    cy.contains(questions[0].question).should('be.visible');
  });

  it('should allow answering questions and progress through the quiz', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Answer the first question (correct answer: '5')
    cy.contains(questions[0].answers[1].text).click(); // Assuming '5' is the correct answer
    cy.contains(questions[1].question).should('be.visible');

    // Answer the second question (correct answer: 'def')
    cy.contains(questions[1].answers[0].text).click();
    cy.contains(questions[2].question).should('be.visible');

    // Answer the third question (correct answer: 'String')
    cy.contains(questions[2].answers[1].text).click();
    cy.contains(questions[3].question).should('be.visible');

    // Answer the fourth question (correct answer: 'class MyClass:')
    cy.contains(questions[3].answers[0].text).click();
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 4/4').should('be.visible');
  });

  it('should allow restarting the quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.contains(questions[0].answers[1].text).click();
    cy.contains(questions[1].answers[0].text).click();
    cy.contains(questions[2].answers[1].text).click();
    cy.contains(questions[3].answers[0].text).click();
    cy.contains('Quiz Completed').should('be.visible');

    cy.contains('Take New Quiz').click();
    cy.contains('Start Quiz').should('be.visible');
  });
});