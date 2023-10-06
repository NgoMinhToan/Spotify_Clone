import { useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/localStorage';
import { LocalStorageKey } from '../constants/local-storage-key';

type TLoginState = {
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    updatedAt: number,
}

export const useLoginState = () => {
    const [loginState, setLoginState] = useState<TLoginState>({
        accessToken: getLocalStorage(LocalStorageKey.ACCESS_TOKEN) ?? '',
        refreshToken: getLocalStorage(LocalStorageKey.REFRESH_TOKEN) ?? '',
        expiresIn: parseInt(getLocalStorage(LocalStorageKey.EXPIRES_IN) + '') ?? Date.now() + 1000,
        updatedAt: parseInt(getLocalStorage(LocalStorageKey.UPDATED_AT) + '') ?? Date.now(),
    })

    useEffect(() => {
        function checkUserData() {
            console.log('Checking user data')
            setLoginState({
                accessToken: getLocalStorage(LocalStorageKey.ACCESS_TOKEN) ?? '',
                refreshToken: getLocalStorage(LocalStorageKey.REFRESH_TOKEN) ?? '',
                expiresIn: parseInt(getLocalStorage(LocalStorageKey.EXPIRES_IN) + '') ?? Date.now() + 1000,
                updatedAt: parseInt(getLocalStorage(LocalStorageKey.UPDATED_AT) + '') ?? Date.now(),
            })
        }

        window.addEventListener('storage', checkUserData)

        return () => {
            window.removeEventListener('storage', checkUserData)
        }
    }, [])

    if (loginState.accessToken === '') return undefined;
    return loginState;
}   