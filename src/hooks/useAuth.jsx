import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
//usecontext podemos extraerlos datos

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth