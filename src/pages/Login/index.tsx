import { Link } from 'react-router-dom'
import { AUTH_URL } from '../../services/Auth/api_path'
import { Button } from 'antd'
import { LocalStorageKey } from '../../constants/local-storage-key';
import { useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext';
import { ActionTypeEnum } from '../../contexts/AppContext/actionType';
import path from '../../constants/path';

const Login = () => {
    const random_string_state = 'random_string';
    const { dispatch } = useContext(AppContext)
    useEffect(() => {
        dispatch({type: ActionTypeEnum.SET_LOCALSTATE, payload: {[LocalStorageKey.RANDOM_STATE]: random_string_state, player_state: {track_window: undefined}}})
    }, [])
    
    const auth_param = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        response_type: 'code',
        redirect_uri: `${location.origin}${path.AUTH_PATH}`,
        state: random_string_state,
        scope: 'user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state streaming',
        show_dialog: 'false',
    }

    const url = new URL(AUTH_URL)
    url.search = new URLSearchParams(auth_param).toString();
    
    return (
        <div className='w-full h-full'>
            <div className="flex items-center justify-center h-full">
                <Link to={ url.toString() }>
                    <Button size='large' className='btn btn-outlined-ripple'>Login with Spotify</Button>
                </Link>
            </div>
        </div>
    )
}

export default Login