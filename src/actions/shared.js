import { getInitialData } from "../utils/api";
import {  receiveUsers } from "./users";
import {  receiveQuestions } from "./questions";

export function handeInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    }).then(() => console.log("Done with getting initial data"));
  };
}
