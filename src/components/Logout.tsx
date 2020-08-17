import * as React from "react";
import { auth } from "../firebase";
export default function Logout() {
  React.useEffect(() => {
    console.log("Hello world");
    auth.signOut();
  }, []);

  return <div>Logging out...</div>;
}
