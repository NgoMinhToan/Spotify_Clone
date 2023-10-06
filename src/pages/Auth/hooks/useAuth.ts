import { useMemo, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from '../../../services/Auth/service';
import { HOME_PATH, LOGIN_PATH } from '../../../constants/path';
import { AppContext } from '../../../contexts/AppContext';

const useAuth = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries())
    const navigate = useNavigate()
    const { state: localState } = useContext(AppContext)
    const {mutate, isLoading} = useLogin();

    const code = useMemo<string>(() => {
        const { code, state } = params;
        const checkIsAuth = code !== undefined && state !== undefined && state === localState.state
        if (checkIsAuth) return code;
        return '';
    }, [params, localState])

    useEffect(() => {
        if (localState.access_token !== undefined) {
            navigate(HOME_PATH)
        }
        else if (code === '') {
            navigate(LOGIN_PATH)
        }
    }, [code, localState, navigate])

    useEffect(() => {
        if (code !== '') {
            mutate({code: code}, {
                onError: () => {
                    navigate(LOGIN_PATH)
                }
            })
        }
    }, [code, mutate, navigate])

    return { isLoading }
}

export default useAuth