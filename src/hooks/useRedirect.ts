
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import useCurrentPath from './useCurrentPath'
import { AUTH_PATH, HOME_PATH, LOGIN_PATH } from '../constants/path'
import { AppContext } from '../contexts/AppContext'

export const useRedirectOnLogin = () => {
    const {state: localState} = useContext(AppContext)
    const currentPath = useCurrentPath()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentPath !== AUTH_PATH) {

            // When not login or unauthorize => redirect to Login
            if ((!localState.access_token || localState.access_token && !localState.expires_in) && currentPath !== LOGIN_PATH) {
                navigate(LOGIN_PATH)
                return;
            }

            // When login => redirect to Home
            if (localState.access_token && currentPath === LOGIN_PATH) {
                navigate(HOME_PATH)
                return;
            }
        }
    }, [localState, currentPath, navigate])
}
