
import { Outlet } from 'react-router-dom'
import useCurrentPath from '../../hooks/useCurrentPath'
import classNames from 'classnames'
import path from '../../constants/path'
import SpotifyComponent from '../../components/SpotifyPlayer'
import { AppContext } from '../../contexts/AppContext'
import { useContext } from 'react'
import useSpotifyController from '../../hooks/useSpotifyController'
import { CloseOutlined } from '@ant-design/icons'
import { usePause } from '../../services/SpotifyApi/service'
import { ActionTypeEnum } from '../../contexts/AppContext/actionType'

const MusicPlayerLayout: React.FC = () => {
  const {state: localState, dispatch} = useContext(AppContext)
  const { mutate: pause } = usePause();
  useSpotifyController()


  const closePlayer = () => {
    pause(undefined, {
      onSuccess: () => {
        dispatch({ type: ActionTypeEnum.SET_LOCALSTATE, payload: { player_state: {track_window: undefined} }})
      }
    })
  }
  
  return (
    <div className='music-player-layout'>
        <LeftComponent />
      <div className={classNames("music-player", { 'have-media-player': localState.player_state?.track_window?.current_track})}>
        <SpotifyComponent />
        <button className="turn-off-player-btn" onClick={closePlayer}><CloseOutlined /></button>
        </div>
    </div>
  )
}

const LeftComponent: React.FC = () => {
  const currentPath = useCurrentPath()
  const isSearchPath = currentPath === path.SEARCH_PATH;
  const isLibraryPath = currentPath === path.LIBRARY_PATH;
  const isHomePath = currentPath === path.HOME_PATH;
  const isActivePath: Record<string, boolean> = {homePath: isHomePath, searchPath: isSearchPath, libraryPath: isLibraryPath};

  return (
    <div className={classNames('left-content', {'is-left-content': true})}>
      {Object.keys(isActivePath).map((pathName) => (
        <div key={pathName} className={classNames("tab-component", { "is-active-path": isActivePath[pathName] })}>
          {isActivePath[pathName] && <Outlet /> }
        </div>
      ))}
    </ div>
  )
}

export default MusicPlayerLayout