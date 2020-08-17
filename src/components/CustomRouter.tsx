import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserInfo from "./UserInfo";
import Home from "./Home";
import SignIn from "./SignIn";
import Logout from "./Logout";
import useUser from "../_hooks/useUser";

export default function CustomRouter() {
  const { userState, loaded, isLoggedIn } = useUser();

  React.useEffect(() => {
    console.log(userState, loaded);
  });

  return (
    <Router>
      {!loaded ? null : isLoggedIn() ? (
        <Switch>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/signin">
            <Redirect to="/user"></Redirect>
          </Route>
          <Route path="/user">
            <UserInfo user={userState} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/logout">
            <Redirect to="/signin" />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      )}
    </Router>
  );
}
