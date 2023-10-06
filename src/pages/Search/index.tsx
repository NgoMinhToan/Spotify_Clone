import { useContext, useState } from 'react'
import SpotifyAnimateIcon from '../../assets/SpotifyAnimateIcon'
import SpotifyIcon from '../../assets/SpotifyIcon'
import { useDebounceFn } from 'ahooks'
import { useSpotifySearch } from '../../services/SpotifyApi/service'
import MediaItem from '../../components/MediaItem'
import { AppContext } from '../../contexts/AppContext'
import { ActionTypeEnum } from '../../contexts/AppContext/actionType'

const SearchPage = () => {
  const { state: localState, dispatch } = useContext(AppContext)
  const { mutate: searchTrack, isLoading: isSearchLoading } = useSpotifySearch()
  const [searchResult, setSearchResult] = useState<SPOTIFY_API.TSearchItems[]>(localState.search_items || [])
  const {run: handleSearchChange} = useDebounceFn((event) => {
    const value = typeof event === 'string' ? event : event.target.value;
    // dispatch({type: ActionTypeEnum.SET_APP_STATE, payload: {search_string: value}})
    searchTrack({
      q: value,
      type: 'track'
    }, {
      onSuccess: (data) => {
        dispatch({ type: ActionTypeEnum.SET_APP_STATE, payload: { search_string: value, search_items: data.tracks.items }})
        setSearchResult(data.tracks.items)
      }
    })
  }, {wait: 1000})

  return (
    <div className='search-content'>
      <div className="search-box">
        <input type="search" name='search' autoComplete='on' className="search-input" placeholder='Tìm kiếm bài hát' onChange={handleSearchChange} defaultValue={localState.search_string} />
        <span className="search-icon">
          {isSearchLoading ? (
            <SpotifyAnimateIcon width={30}/>
          ) : (
            <SpotifyIcon width={30} /> 
          )}
        </span>
      </div>
        <div className="music-list">
          <div className="wrapper-content">
            {searchResult && searchResult.map((item) => 
                <MediaItem key={item.id} item={item} />
            )}
          </div>
        </div>
    </ div>
  )
}

export default SearchPage