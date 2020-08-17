import * as React from "react";
import { Link } from "react-router-dom";

// an interface also comes from typescript and is used
// to describe what paramaters are getting passed into UserInfo
interface IProps {
  user: firebase.User;
}

export default function UserInfo(params: IProps) {
  return params.user == null ? (
    <div>
      Insuffiecent permissions, please sign in <Link to="/signin">here</Link>
    </div>
  ) : (
    <div>
      You're on the user info page and your email is <b>{params.user.email}</b>.
      If you see this, that means you have succesfully logged in! Alternatively
      you can <Link to="/logout">sign out.</Link>
    </div>
  );
}
