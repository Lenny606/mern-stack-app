// import {useAuth} from "../context/auth/AuthContext.jsx";
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {

    //check if user is logged
    // const {currentUser} = useAuth()
    //
    // if (currentUser) {
    //     return children
    // }

    return <Navigate to={"/login"} replace/>
}