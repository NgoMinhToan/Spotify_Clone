import { NavLink } from "react-router-dom"
import SpotifyIcon from "../../assets/SpotifyIcon"
import path, { LOGIN_PATH } from "../../constants/path"
import { clearLocalStorage } from "../../utils/localStorage"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"

const Header = () => {
  const { clearState } = useContext(AppContext)
  const logout = () => {
    clearState()
    clearLocalStorage()
    window.location.href = LOGIN_PATH
  }
  return (

    <div className="header">
      <NavLink to={path.HOME_PATH} className='logo'>
        <SpotifyIcon width={43} />
        <span className="logo-text">Music On Air</span>
      </NavLink>
      <div className="menu-item">
        <NavLink to={path.SEARCH_PATH} >
          <span>Search</span>
        </NavLink>
        <NavLink to={path.LIBRARY_PATH}>
          <span>Library</span>
        </NavLink>
      </div>
      <div className="user-info">
        <button onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default Header