import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
import { getQuestions } from '../../src/services/questionApi';

// Mock questions data
const mockQuestions = [
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
];


describe('Quiz Component', () => {
  beforeEach(() => {
    // Stub the API call to return mock questions
    cy.stub(getQuestions, 'default').resolves(mockQuestions);

    // Mount the Quiz component
    mount(<Quiz />);
  });

  it('should display the start button initially', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and load the first question on clicking Start Quiz', () => {
    cy.contains('Start Quiz').click();
    cy.contains(mockQuestions[0].question).should('be.visible');
  });

  it('should allow answering questions and progress through the quiz', () => {
    cy.contains('Start Quiz').click();

    // Answer the first question
    cy.contains('4').click();
    cy.contains(mockQuestions[1].question).should('be.visible');

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