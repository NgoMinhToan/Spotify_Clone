import { useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext';
import { ActionTypeEnum } from '../../contexts/AppContext/actionType';
import { LocalStorageKey } from '../../constants/local-storage-key';
import { useStartTrack } from '../../services/SpotifyApi/service';

const useSpotifyController = () => {
    const { state: localState, dispatch, setIsConnected, setPlayerState, setPlayerController } = useContext(AppContext)
    const { mutate: setTrack } = useStartTrack()

    useEffect(() => {
        if (!localState.access_token) return;

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(localState.access_token ?? ''); },
                volume: 0.5
            });

            const readyListener = ({ device_id }: {device_id: string}) => {
                console.log('Ready with Device ID', device_id);
                setPlayerState({ deviceId: device_id, paused: true })
                setIsConnected(true);
            }

            const notReadyListener = ({ device_id }: {device_id: string}) => {
                console.log('Device ID has gone offline', device_id);
                dispatch({ type: ActionTypeEnum.REMOVE_LOCALSTATE, payload: { [LocalStorageKey.PLAYER_STATE]: undefined } })
                setIsConnected(false)
            }

            const playerStateChangeListener = ((state: Spotify.PlaybackState) => {

                if (!state) {
                    return;
                }

                setPlayerState(state)
                // console.log(state)

            })
            
            setPlayerController(player);
            player.addListener('ready', readyListener);
            player.addListener('not_ready', notReadyListener);
            player.connect();
            player.addListener('player_state_changed', playerStateChangeListener);

            return () => {
                player.removeListener('ready')
                player.removeListener('not_ready')
                player.removeListener('player_state_changed')
            }

        };
    }, []);

    
    useEffect(() => {
        if (localState.connected && localState.player_state?.track_window?.current_track) {
            const mediaInfo = {
                artist: localState.player_state.track_window.current_track?.artists[0].name,
                title: localState.player_state.track_window.current_track?.name,
                uri: localState.player_state.track_window.current_track?.uri,
                albumUrl: localState.player_state.track_window.current_track?.album.images[0].url,
                albumUri: localState.player_state.track_window.current_track.album.uri,
            }
            setTrack({ context_uri: mediaInfo.albumUri, offset: { uri: mediaInfo.uri } }, {
                onSuccess: () => {
    
                }
            })

        }
    }, [setTrack, localState.connected])

}

export default useSpotifyController