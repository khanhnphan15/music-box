import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import './PlayerContext.css';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState({});
    const [isPaused, setIsPaused] = useState(false);

    const handlePlayPause = () => {
        let a = currentSong
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPaused(false);
        } else {
            audioRef.current.pause();
            setIsPaused(true);
        }
    };

    useEffect(() => {
        handlePlayPause();
    }, [currentSong]);

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, isPaused, setIsPaused, handlePlayPause, audioRef }}>
            <audio id="audio-player" ref={audioRef} controls src={currentSong.url} style={{marginLeft: '1rem'}}/>

            {children}

            <div className="footer">
                <div className="playbar">
                    <div className="playbar-details">
                        <img src="song-cover.jpg" alt="Song Cover" className="song-cover"/>
                        <div className="song-info">
                            <p className="song-title">{currentSong.title}</p>
                            <p className="song-artist">{currentSong.artistName}</p>
                        </div>
                    </div>

                    <div className="playback-controls">
                        <button className="control-button" id="prev-button">
                            <i className="step backward icon"></i>
                        </button>
                        {
                            !audioRef.current ? (
                                <button className="control-button" id="play-button">
                                    <i className='play circle icon'></i>
                                </button>
                            ) : (
                                // Show the play/pause button when audioRef.current is set
                                <button className="control-button" id="play-button" onClick={() => handlePlayPause()}>
                                    <i className={`${isPaused ? 'play' : 'pause'} circle icon`}></i>
                                </button>
                            )
                        }
                        <button className="control-button" id="next-button">
                            <i className="step forward icon"></i>
                        </button>
                    </div>

                    <div></div>
                </div>
            </div>
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => useContext(PlayerContext);