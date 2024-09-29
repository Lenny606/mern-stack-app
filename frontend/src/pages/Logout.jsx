//best practice is to use File with action

//TODO DOESNT WORK - REMOVE
import {redirect} from "react-router-dom";

export const logoutAction = () => {

    localStorage.removeItem("token");

    return redirect("/")
}