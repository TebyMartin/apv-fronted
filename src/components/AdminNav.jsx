import { Link } from "react-router-dom"


function AdminNav() {
  return (
    <nav className="flex gap-5">
      <Link
        to={"/admin/perfil"}
        className="font-bold uppercase text-gray-600"
      >Perfil</Link>
      <Link
        to={"/admin/cambiar-password"}
        className="font-bold uppercase text-gray-600"
      >Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav