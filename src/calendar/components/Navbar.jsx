import { useAuthStore } from "../../hooks"

export const Navbar = () => {

  const { startLogout, user } = useAuthStore()
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        { user.name }
      </span>

      <button className="btn btn-outline-light">
        <i className="fas fa-sign-out-alt"></i>
        <span 
          className="ms-2"
          onClick={ startLogout }>
          Logout
        </span>
      </button>
    </div>
  )
}