import { AppContext } from "./../../contexts/AppContext"
import { useContext, useEffect, useMemo, useState } from "react"
import { useNextTrack, usePreviousTrack, useSeekTrack, useTogglePlay } from '../../services/SpotifyApi/service'
import { FastBackwardOutlined, FastForwardOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import ProgressBarInput from "../ProgressBarInput"

const SpotifyComponent = () => {
  const {state: localState} = useContext(AppContext)
  const {mutate: nextTrack} = useNextTrack();
  const {mutate: previousTrack} = usePreviousTrack();  
  const { mutate: togglePlay } = useTogglePlay()
  const { mutate: seekTrack } = useSeekTrack();
  const [musicProgressPosition, setMusicProgressPosition] = useState<number>(0); 

  const musicDuration = useMemo(() => localState.player_state?.duration || 1, [localState.player_state?.duration])
  const musicProgressPercentage = useMemo(() => Math.round(musicProgressPosition / musicDuration * 100), [musicProgressPosition, musicDuration])

  useEffect(() => {
    setMusicProgressPosition(localState.player_state?.position || 0)
    if (!localState.player_state?.paused) {
      const intervalMsTime = 500;
      const autoProgressBarInterval = setInterval(() => {
        setMusicProgressPosition(presentProgress => Math.min(presentProgress + intervalMsTime, musicDuration))
      }, intervalMsTime)

      return () => clearInterval(autoProgressBarInterval)
    }
  }, [localState.player_state, musicDuration])

  const seekHandler = (value: number) => {
    const positionValue = Math.round(value * (localState.player_state?.duration || 0) / 100 )
    seekTrack({ position_ms: positionValue })
  }

  const ms2time = (value: number) => {
    return (new Date(value)).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })
  }
  

  if (!localState.player_state?.track_window?.current_track) return null;

  
  return (

    <div className="player">
      <div className="media-info">
        <div className="main-wrapper">
          <img src={localState.player_state.track_window?.current_track.album.images[0].url}
            className="now-playing__cover" alt="" />
        </div>
      </div>
      <div className="now-playing__side desc">
        <div className="now-playing__name title">{
          localState.player_state.track_window?.current_track.name
        }</div>

        <div className="now-playing__artist artist">{
          localState.player_state.track_window?.current_track.artists[0].name
        }</div>
      </div>

      <div className="time-desc">
        <span className="time-start">{ms2time(musicProgressPosition)}</span>
        <span className="time-end">{ms2time(musicDuration)}</span>
      </div>

      <ProgressBarInput value={musicProgressPercentage} onChange={seekHandler} />

      <div className="btn-control">
        <button className="btn-spotify" onClick={() => { previousTrack() }} >
          <FastBackwardOutlined />
        </button>

        <button className="btn-spotify" onClick={() => { togglePlay() }} >
          {localState.player_state.paused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
        </button>

        <button className="btn-spotify" onClick={() => { nextTrack() }} >
          <FastForwardOutlined />
        </button>
      </div>
    </div>
  )
}

export default SpotifyComponent