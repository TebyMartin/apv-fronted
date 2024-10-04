import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/alerta'
import clienteAxios from '../config/axios'
function Regsitrar() {

  const  [nombre, setNombre] = useState('')
  const  [email, setEmail] = useState('')
  const  [password, setPassword] = useState('')
  const [repetirpassword, setRepetirpassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([nombre, email, password, repetirpassword ].includes('')) {
      //includes para tener acceso al arreglo
      setAlerta({msg: "Hay campos vacios", error: true})
        return 
    }

    if (password !== repetirpassword) {
      setAlerta({msg: "Los Passwords no coinciden", error: true})
      return
    }
    if (password.length < 6) {
      setAlerta({msg: "El Password es muy corto, agrega minimo 6 caracteres", error: true})
      return
    }

    setAlerta({})

    //crear usuario en la api
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password })
      setAlerta({
        msg: "Creado correctamente, revisa tu email",
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  
  return (
    
    <>
    <div>
        <h1 className="text-indigo-600 font-black text-6xl ">Crea tu cuenta y Administra {""}<span className="text-black">tus Pacientes</span></h1>

      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
       {msg &&  <Alerta
          alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Nombre
            </label>
            <input type="text"
                  placeholder="Tu nombre"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Email
            </label>
            <input type="email"
                  placeholder="Email de registro"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Password
            </label>
            
            <input type="password"
                  placeholder="Ingresa tu password"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Repetir Password
            </label>

            <input type="password"
                  placeholder="Ingresa nuevamente password"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={repetirpassword}
                  onChange={e => setRepetirpassword(e.target.value)}
            />
          </div>
         
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-gray-600'
              to="/">Ya tienes una cuenta? Inicia sesion</Link>
            <Link
              className='block text-center my-5 text-gray-600'
              to="/olvide-password">Olvide mi Password</Link>
          </nav>
        </div>
      
      </>
  )
}

export default Regsitrar