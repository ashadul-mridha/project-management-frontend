import { useContext } from "react";
import { AuthContext } from "../providers/AuthContextProvider";

const useAuthHooks = () => {
    const data = useContext(AuthContext)
    return data;
}

export default useAuthHooks;