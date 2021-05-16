import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION,
} from "../actions/questions";
function generateAddAnswer(state = {}, action) {
  console.log(state, action);
  let votes = state[action.qid][action.answer].votes.concat([
    action.authedUser,
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
      console.log(action);
      return generateAddAnswer(state, action);

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
