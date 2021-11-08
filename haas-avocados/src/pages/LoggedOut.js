import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth";

class LoggedOut extends React.Component{

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