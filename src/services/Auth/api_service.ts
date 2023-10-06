import request from "umi-request";
import * as API_ENDPOINT from './api_path';


export async function Login(data: AUTH.TLoginBody) {
    return request<AUTH.TLoginResponse>(API_ENDPOINT.LOGIN_URL, {
        method: 'POST',
        data: data,
        retryDelay: 1000
    })
}
export async function RefreshToken(data: AUTH.TRefreshTokenBody) {
    return request<AUTH.TLoginResponse>(API_ENDPOINT.REFRESH_TOKEN_URL, {
        method: 'POST',
        data: data,
        retryDelay: 1000
    })
}