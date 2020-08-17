import { authState } from "rxfire/auth";
import { auth } from "../firebase";

export default authState(auth);
