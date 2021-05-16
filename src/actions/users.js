export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function userQuestionAdded(authedUser, qid) {
  return {
    type: ADD_QUESTION_TO_USER,
    authedUser,
    qid,
  };
}
export function addUserAnswer(authenticatedUser, qid, answer) {
  return {
    type: ADD_USER_ANSWER,
    authenticatedUser,
    qid,
    answer,
  };
}
