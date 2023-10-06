import React, { useContext } from 'react'
import SpotifyAnimateIcon from '../../assets/SpotifyAnimateIcon'
import { LocalStorageKey } from '../../constants/local-storage-key'
import { AppContext } from '../../contexts/AppContext'
import { ActionTypeEnum } from '../../contexts/AppContext/actionType'
import classNames from 'classnames'
import { useStartTrack } from '../../services/SpotifyApi/service'

const MediaItem: React.FC<{item: SPOTIFY_API.TSearchItems}> = ({item}) => {
    const { state: localState, dispatch } = useContext(AppContext)
    const { mutate: setTrack } = useStartTrack()
    const checkDisabled = item.available_markets.length === 0;

    const mediaInfo = {
        artist: item?.artists[0].name,
        title: item?.name,
        uri: item?.uri,
        albumUrl: item?.album.images[0].url,
        albumUri: item.album.uri,
    }

    const onClickItem = () => {
        if (checkDisabled) return;
        setTrack({ context_uri: mediaInfo.albumUri, offset: { uri: mediaInfo.uri }, position_ms: 0 }, {
            onSuccess: () => {
                dispatch({type: ActionTypeEnum.SET_LOCALSTATE, payload: {[LocalStorageKey.PLAYER_STATE]: {current_track: item}}})
            },
        })
    }

  return (
      <div className={classNames("item track-item", { active: localState.player_state?.track_window?.current_track?.uri === mediaInfo.uri, disabled: checkDisabled })} onClick={onClickItem}>
          <div className="artist-img">
              <img src={mediaInfo.albumUrl} alt={mediaInfo.albumUrl} />
          </div>
          <div className="track-desc">
              <span className="track-title">{mediaInfo.title}</span>
              <span className="track-artist">{mediaInfo.artist}</span>
          </div>
          <div className="player-icon">
            <SpotifyAnimateIcon width={30} fill='none' />
          </div>
      </div>
  )
}

export default MediaItem