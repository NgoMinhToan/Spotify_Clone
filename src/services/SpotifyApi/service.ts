import { useMutation, useQuery } from "@tanstack/react-query"
import { NextTrack, PauseTrack, Playback, PreviousTrack, Search, SeekPlay, StartTrack, TogglePlay } from "./api_service"
import { AppContext } from "../../contexts/AppContext"
import { useContext } from 'react'

export const useSpotifySearch = () => {
    return useMutation(['Spotify', 'Search'], (param: SPOTIFY_API.TSearchParam) => Search(param))
}
export const usePlaybackState = () => {
    return useQuery(['Spotify', 'Playerback State'], () => Playback())
}
export const useStartTrack = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Start & Resume'], (data: SPOTIFY_API.TTrackPlayerPayload) => StartTrack(data, { device_id: localState.player_state?.deviceId ?? '' }))
}
export const useTogglePlay = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Toggle Play'], () => TogglePlay({ device_id: localState.player_state?.deviceId ?? '' }, !localState.player_state?.paused ?? false))
}
export const useStart = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Start'], () => StartTrack({}, { device_id: localState.player_state?.deviceId ?? '' }))
}
export const usePause = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Pause'], () => PauseTrack({ device_id: localState .player_state?.deviceId ?? ''}))
}
export const useNextTrack = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Skip to next'], () => NextTrack({ device_id: localState .player_state?.deviceId ?? ''}))
}
export const usePreviousTrack = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Skip to previous'], () => PreviousTrack({ device_id: localState .player_state?.deviceId ?? ''}))
}
export const useSeekTrack = () => {
    const { state: localState } = useContext(AppContext)
    return useMutation(['Spotify', 'Seek to'], (params: SPOTIFY_API.TPositionPayload) => SeekPlay(params, { device_id: localState .player_state?.deviceId ?? ''}))
}
