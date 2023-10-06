import { useMutation } from "@tanstack/react-query"
import { Login, RefreshToken } from "./api_service"
import { LocalStorageKey } from "../../constants/local-storage-key"
import { AppContext } from "../../contexts/AppContext"
import { useContext } from 'react'
import { ActionTypeEnum } from "../../contexts/AppContext/actionType"

export const useLogin = () => {
    const { dispatch } = useContext(AppContext)
    return useMutation(['Auth', 'Login'], (data: AUTH.TLoginBody) => Login(data), {
        onSuccess: data => {
            dispatch({
                type: ActionTypeEnum.SET_LOCALSTATE, 
                payload: {
                    [LocalStorageKey.ACCESS_TOKEN]: data.accessToken,
                    [LocalStorageKey.REFRESH_TOKEN]: data.refreshToken,
                    [LocalStorageKey.EXPIRES_IN]: `${data.expiresIn * 1000}`,
                    [LocalStorageKey.UPDATED_AT]: `${Date.now()}`,
            }})
        }
    })
}

export const useRefreshToken = (data: AUTH.TRefreshTokenBody) => {
    const { dispatch } = useContext(AppContext)
    return useMutation(['Auth', 'RefreshToken', data], () => RefreshToken(data), {
        onSuccess: data => {
            dispatch({
                type: ActionTypeEnum.SET_LOCALSTATE,
                payload: {
                    [LocalStorageKey.ACCESS_TOKEN]: data.accessToken,
                    [LocalStorageKey.EXPIRES_IN]: `${data.expiresIn * 1000}`,
                    [LocalStorageKey.UPDATED_AT]: `${Date.now()}`,
                }
            })
        }
    })
}