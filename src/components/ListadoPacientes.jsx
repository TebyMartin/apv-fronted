import usePacientes from "../hooks/usePacientes"
import Pacientes from "./Pacientes"


function ListadoPacientes() {
  const {pacientes} = usePacientes()
  return (
    <>
      
      {pacientes.length ? (
        <>
            <h2 className="font-bold text-3xl text-center">Listado de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Administra tus { ''} <span className="text-indigo-600 font-bold">pacientes y citas</span></p>
          {pacientes.map(paciente => (
            <Pacientes
              key={paciente._id}
              paciente= {paciente}
            />
          ))
            
            }
        </>
      ) :
      (
        <>
          <h2 className="font-bold text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comieza agregando Pacientes { ''} <span className="text-indigo-600 font-bold">y apareceran en este lugar</span></p>
        </>
      )}
    
    </>
  )
}

export default ListadoPacientes