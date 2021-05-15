import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getUsers,
  _getQuestions,
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}
export function saveAnswer(authedUser, questionId, answer) {
  return _saveQuestionAnswer({ authedUser, questionId, answer });
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}
