import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION,
} from "../actions/questions";
function generateAddAnswer(state, action) {
  let votes = state[action.qid][action.answer].votes.concat([
    action.authenticatedUser,
  ]);
  return {
    ...state,
    [action.qid]: {
      ...state[action.qid],
      [action.answer]: {
        ...state[action.qid][action.answer],
        votes,
      },
    },
  };
}

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_ANSWER:
      return generateAddAnswer();

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
