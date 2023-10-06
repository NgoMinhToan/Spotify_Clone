const SpotifyAnimateIcon: React.FC<{ width?: number, height?: number, fill?: string }> = ({ width, height, fill ='#D76C1E' }) => {
  return (
      <svg width={width} height={height} viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="spotify-icon-loading" clipPath="url(#clip0_4_15)">
            <path id="stroke-icon-outside" d="M0.5 22C0.5 10.5048 9.7002 1.1875 21.0222 1.1875C32.3442 1.1875 41.5444 10.5048 41.5444 22C41.5444 33.4952 32.3442 42.8125 21.0222 42.8125C9.7002 42.8125 0.5 33.4952 0.5 22Z" fill={fill} stroke="white" />
              <path id="stroke-icon-inside-1" d="M8.5 15C14 13 27.5 13 34.5 18" stroke="#D9D9D9" strokeWidth="5.2" strokeLinecap="round" />
              <path id="stroke-icon-inside-2" d="M9.5 22C14.1667 20.5 23.1 20 31.6 24.5" stroke="#D9D9D9" strokeWidth="4.7" strokeLinecap="round" />
              <path id="stroke-icon-inside-3" d="M10 28.5C12.5 28 21 25.5 29.5 30.5" stroke="#D9D9D9" strokeWidth="3.8" strokeLinecap="round" />
        </g>
        <defs>
            <clipPath id="clip0_4_15">
                <rect width="42.0444" height="44" fill="white" />
            </clipPath>
        </defs>
    </svg>
  )
}

export default SpotifyAnimateIcon