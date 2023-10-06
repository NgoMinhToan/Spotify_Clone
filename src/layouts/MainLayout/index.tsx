import { Outlet } from 'react-router-dom'
import { useRedirectOnLogin } from '../../hooks/useRedirect'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => {
    useRedirectOnLogin()
  return (
      <div className='main-layout'>
          <Header />
          <div className="body-wrapper">
            <div className="body">
              <Outlet />
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default MainLayout