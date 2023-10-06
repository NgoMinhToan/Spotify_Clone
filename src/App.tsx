import './App.css'
import useRouteLoading from './hooks/useRouteLoading';
import { Routes } from 'react-router-dom';
import { useEffect, useContext } from 'react'
import { useRefreshToken } from './services/Auth/service';
import { AppContext } from './contexts/AppContext';

function App() {
  const RouteJSX = useRouteLoading()
  const {state: localState} = useContext(AppContext)
  const { mutate } = useRefreshToken({ refreshToken: localState.refresh_token ?? '' })

  useEffect(() => {
    if (!localState.access_token) return;
    const timeLeft = Math.max(parseInt(localState.expires_in || '') + parseInt(localState.update_at || '') - Date.now() - 60000 || 0, 1000)
    const refreshTokenTimeOut = setTimeout(() => {
      mutate()
    }, timeLeft);
    return () => clearTimeout(refreshTokenTimeOut)
  }, [localState, mutate])

  return (
    <div className="app-screen background dark">
      <Routes>
        {RouteJSX}
      </Routes>
    </div>
  )
}

export default App
