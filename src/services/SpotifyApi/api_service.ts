import request from '../Interceptors';
import * as API_ENDPOINT from './api_path';


export async function Search(param: SPOTIFY_API.TSearchParam) {
    return request<SPOTIFY_API.TSearchResponse>(API_ENDPOINT.SEARCH_URL, {
        method: 'GET',
        params: param
    })
}
export async function Playback() {
    return request(API_ENDPOINT.PLAYBACK_STATE, {
        method: 'GET',
    })
}
export async function StartTrack(data: SPOTIFY_API.TTrackPlayerPayload, params: SPOTIFY_API.TDeviceId) {
    return request(API_ENDPOINT.PLAYBACK_CONTROLLER_PLAY, {
        method: 'PUT',
        data: data,
        params: params,
    })
}
export async function TogglePlay(params: SPOTIFY_API.TDeviceId, is_playing: boolean) {
    if (is_playing) {
        return request(API_ENDPOINT.PLAYBACK_CONTROLLER_PAUSE, {
            method: 'PUT',
            params: params,
        })
    } else {
        return request(API_ENDPOINT.PLAYBACK_CONTROLLER_PLAY, {
            method: 'PUT',
            params: params,
        })
    }
}
export async function PauseTrack(params: SPOTIFY_API.TDeviceId) {
    return request(API_ENDPOINT.PLAYBACK_CONTROLLER_PAUSE, {
        method: 'PUT',
        params: params,
    })
}
export async function NextTrack(data: SPOTIFY_API.TDeviceId) {
    return request(API_ENDPOINT.PLAYBACK_CONTROLLER_NEXT, {
        method: 'POST',
        data: data,
    })
}
export async function PreviousTrack(data: SPOTIFY_API.TDeviceId) {
    return request(API_ENDPOINT.PLAYBACK_CONTROLLER_PREVIOUS, {
        method: 'POST',
        data: data,
    })
}
export async function SeekPlay(params: SPOTIFY_API.TPositionPayload ,data: SPOTIFY_API.TDeviceId) {
    return request(API_ENDPOINT.PLAYBACK_CONTROLLER_SEEK, {
        method: 'PUT',
        params: params,
        data: data,
    })
}