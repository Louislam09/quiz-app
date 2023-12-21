export const TYPES = {
  SET_QUESTIONS: 'SET_QUESTIONS',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  RESET_QUIZ: 'RESET_QUIZ',
};

export const intState = {
  questions: [],
  currentQuestion: 0,
  answers: {},
  reset: false,
};

export const quizReducer = (state = intState, action) => {
  switch (action.type) {
    case TYPES.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        reset: false,
      };
    case TYPES.ANSWER_QUESTION:
      return {
        ...state,
        answers: {
          ...state?.answers,
          [state.currentQuestion]: action.payload,
        },
      };
    case TYPES.NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case TYPES.RESET_QUIZ:
      return {
        ...intState,
        reset: action.payload,
      };
    default:
      return state;
  }
};
