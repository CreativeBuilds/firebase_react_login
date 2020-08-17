import * as React from "react";
import { auth, google } from "../firebase";

enum INPUTS {
  email,
  password,
}

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorResponse, setErrorResponse] = React.useState("");

  const clearError = () => {
    if (errorResponse != "") {
      setErrorResponse("");
    }
  };

  /**
   * The React.ChangeEvent<HTMLInputElement> is from typescript and just shows
   * what value is getting passed in, so you dont have to remember
   * in this case its a "ChangeEvent" coming from "onChange"
   */
  const updateValue = (
    type: INPUTS,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearError();
    switch (type) {
      case INPUTS.email:
        setEmail(e.target.value);
        break;
      case INPUTS.password:
        setPassword(e.target.value);
        break;
    }
  };

  const trySignIn = async () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setPassword("");
      switch (err.code) {
        default:
          setErrorResponse("An unknown error has occured");
      }
    });
  };

  const trySignUp = async () => {
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorResponse(err.message);
          break;
        default:
          setErrorResponse("An unknown error has occurred");
      }
    });
  };

  const trySignInWithGoogle = async () => {
    auth.signInWithPopup(google).catch((err) => {
      switch (err.code) {
        default:
          setErrorResponse("An unknown error has occurred");
      }
    });
  };

  return (
    <div className="sign_in">
      <span>Email:</span>
      <input
        type="text"
        value={email}
        onChange={updateValue.bind(null, INPUTS.email)}
      />
      <span>Password:</span>
      <input
        type="password"
        value={password}
        onChange={updateValue.bind(null, INPUTS.password)}
      />
      <div className="error_response">{errorResponse}</div>
      <button onClick={trySignIn}>Sign in</button>{" "}
      <button onClick={trySignUp}>Sign up</button>
      <button onClick={trySignInWithGoogle}>Or sign in with Google</button>
    </div>
  );
}
