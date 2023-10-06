import React, { useEffect, useState } from 'react'

const ProgressBarInput: React.FC<{ onChange?: (value: number) => void, value: number }> = ({ onChange, value }) => {

    const [musicProgress, setMusicProgress] = useState<number>(value);
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    useEffect(() => {
        if (mouseDown) return;
        setMusicProgress(value)
    }, [value])

    document.getElementsByClassName


    return (
        <div className="music-progress">
            <input type="range"
                onInput={(e) => {
                    setMusicProgress(parseInt((e.target as HTMLInputElement)?.value))
                }}
                onMouseUp={(e) => {
                    setTimeout(() => setMouseDown(false), 1000);
                    const value = parseInt((e.target as HTMLInputElement)?.value);
                    if (onChange) onChange(value)
                }}
                onMouseDown={() => setMouseDown(true)}
                value={musicProgress}
            />
            <div style={{ scale: `${Math.min(musicProgress / 100, 1)} 1` }} className="progress-bar">
            </div>
        </div>
    )
}

export default ProgressBarInput