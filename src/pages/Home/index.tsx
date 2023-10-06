import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext';
const Home: React.FC = () => {
  const { state: localState } = useContext(AppContext)
  
  return (
    <div className='home'>
      <p className="title-ver-info">
        Version info:
      </p>
      <div className="app-function">
        <p className="title">
          Spotify music:
        </p>
        <ul className="desc">
          <li>Listen music from spotify</li>
          <li>Premium account required</li>
          <li>Requires development account (account list table)</li>
        </ul>
      </div>
      
      <div className="app-function">
        <p className="title">Login info</p>
        <div className="item-info">
          <span className="item-info-title">Current token: </span>
          <span className="item-info-content">
            {localState.access_token}
          </span>
          <span >{}</span>
        </div>
      </div>
    </div>
  )
}

export default Home