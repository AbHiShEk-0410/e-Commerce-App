import { createContext, useReducer, useContext } from "react";
import { app: auth } from "../firebase";
const AuthContext = createContext();
function AuthReducer(authState, payload) {
	switch (payload.query) {
		case "SIGNUP":
			const { email, name, password } = payload.data;
			return auth.createUserWithEmailAndPassword(email, password);

		default:
			break;
	}
}
function AuthProvider({ children }) {
	const [authState, authDispatch] = useReducer({ userData: {}, AuthReducer });
}
export function useAuth() {
	return useContext(AuthContext);
}
