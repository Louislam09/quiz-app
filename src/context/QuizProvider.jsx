import React, { useReducer, createContext } from 'react';
import { intState, quizReducer } from '../reducers';

export const QuizContext = createContext({
  state: {},
  dispatch: ({ }) => { }
});

function QuizProvider(props) {
  const [state, dispatch] = useReducer(quizReducer, intState);
  const value = { state, dispatch }
  return (
    <QuizContext.Provider value={value} {...props} />
  );
}

export default QuizProvider