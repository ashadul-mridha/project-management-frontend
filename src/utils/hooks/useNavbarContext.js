import { useContext } from "react"
import { NavContext } from "../providers/NavbarContextProvider"

const useNavbarContextHooks = () => {

    const navbarData = useContext(NavContext);
    return navbarData;
}

export default useNavbarContextHooks;