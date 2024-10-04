import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/alerta'
import clienteAxios from '../config/axios'

function Login() {
  const [email, setEmail] = useState ('') 
  const [password, setPassword] = useState('') 
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()
  
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([password,email].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorio',
        error:true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', { email, password })
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
  const {msg} = alerta

  return (
      <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl ">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>

      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg &&  <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
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
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Password
            </label>
            <input type="password"
                  placeholder="Tu password"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={password}
                  onChange={e => setPassword(e.target.value)}

                  
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <div>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-gray-600'
              to="/registrar">No tienes una cuenta? Registrate</Link>
            <Link
              className='block text-center my-5 text-gray-600'
              to="/olvide-password">Olvide mi Password</Link>
          </nav>
        </div>

      </div>
      </>
  )
}

export default Login