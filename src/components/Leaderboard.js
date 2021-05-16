import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderBoardAvatar from "./LeaderboardAvatar";

class LeaderBoard extends Component {
  state = {};

  render() {
    const { users } = this.props;
    const sortedUsers = Object.values(users).sort(
      (a, b) =>
        Object.keys(b.answers).length +
        Object.keys(b.questions).length -
        (Object.keys(a.answers).length + Object.keys(a.questions).length)
    );

    console.log(this.props);
    console.log(sortedUsers);
    console.log(users);
    return (
      <div>
        {sortedUsers.map((user) => (
          <LeaderBoardAvatar key={user.id} user={user} />
        ))}
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default connect(mapStateToProps)(LeaderBoard);
