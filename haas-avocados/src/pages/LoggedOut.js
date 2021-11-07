import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth";

class LoggedOut extends React.Component{

  componentDidMount() {
    this.props.auth.logout();
  }

  render() {
    return (
      <>
        <h1>You have been logged out</h1>
        <Link to='/login'>Click here to log back in</Link>
      </>
    )
  }
}

export default LoggedOut;