//context es una alternativa a redux
//provide nace todo el estado globla de la aplicacions nace los datos
//prop reservado llamado children 
//con ese value pongo a disposicion que se puede poner a los diferentes componentes
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext()

const Authprovider = ({children}) => {
    
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    }, [])
    
    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            await clienteAxios.put(url, datos, config)

            return {
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'

            const { data } = await clienteAxios.put(url, datos, config)
            console.log(data) 

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    Authprovider
}

export default AuthContext

