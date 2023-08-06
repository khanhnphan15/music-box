import React from "react";
import './PlayButton.css';
import {usePlayerContext} from "../../context/PlayerContext";
import PlayingSpinner from "../PlayingSpinner/PlayingSpinner";
import {Icon} from "semantic-ui-react";

export default function PlayButton({song, variation}) {
    const {currentSong, setCurrentSong, isPaused, setIsPaused} = usePlayerContext();

    const playSong = (song) => {
        setCurrentSong(song);
    };

    let __variation = variation ?? 'default';
    let currentButton;
    if (currentSong._id === song._id) {
        if (isPaused) {
            switch (__variation) {
                case 'default':
                    currentButton = <div>
                        <i onClick={() => setIsPaused(true)} className="play circle icon"></i>
                    </div>;
                    break;

                case 'no-outline':
                    currentButton = <div>
                        <Icon onClick={() => setIsPaused(true)} name='play' />
                    </div>
                    break;

                default:
                    throw new Error(`${__variation} is not a valid option in PlayButton`);
            }
        } else {
            currentButton = <PlayingSpinner />
        }
    } else {
        switch (__variation) {
            case 'default':
                currentButton = <div>
                    <i onClick={() => playSong(song)} className="play circle icon"></i>
                </div>;
                break;

            case 'no-outline':
                currentButton = <div>
                    <Icon onClick={() => playSong(song)} name='play' />
                </div>
                break;

            default:
                throw new Error(`${__variation} is not a valid option in PlayButton`);
        }
    }

    return (
        currentButton
    );
}
