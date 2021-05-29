import { Route, Navigate } from "react-router-dom";
import { useLogin } from "../contexts";
export default function PrivateRoute({ path, ...props }) {
    const { login } = useLogin()
    return login ? (
        <Route {...props} path={path} />
    ) : (
        <Navigate state={{ from: path }} replace to="/login"></Navigate>
    )
}