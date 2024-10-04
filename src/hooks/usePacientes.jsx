import { useContext } from "react"
import PacientesContext from "../context/PacientesProvider"
//usecontext podemos extraerlos datos

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes