import React, { useEffect, useState } from "react";
import { Card, Container } from "semantic-ui-react";
import * as songApi from "../../utils/songApi";
import Header from "../../components/Header/Header";
import './SongListPage.css';
export default function SongListPage() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs().then(r => {});
    }, []);

    async function fetchSongs() {
        try {
            const songsData = await songApi.getAll();
            setSongs(songsData.songs);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    }

    return (

        <Container className= "song-wrapper">

            <h1>Song List</h1>
            <Card.Group>
                {songs.map((song) => (
                    <Card key={song._id}>
                        <Card.Content>
                            <Card.Header>{song.title}</Card.Header>
                            <Card.Meta>{song.artistName}</Card.Meta>
                            <Card.Description>{song.description}</Card.Description>
                        </Card.Content>
                        {song.url && (
                            <audio controls>
                                <source src={song.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </Card>
                ))}
            </Card.Group>
        </Container>
    );
}



// let a;
// function AudioPlay() {
//     const [buttonName, setButtonName] = useState("Play");
//     const [audio, setAudio] = useState();
//
//     useEffect(() => {
//         if (a) {
//             a.pause();
//             a = null;
//             setButtonName("Play");
//         }
//         if (audio) {
//             a = new Audio(audio);
//             a.onended = () => {
//                 setButtonName("Play");
//             };
//         }
//     }, [audio]);
//
//     const handleClick = () => {
//         if (buttonName === "Play") {
//             a.play();
//             setButtonName("Pause");
//         } else {
//             a.pause();
//             setButtonName("Play");
//         }
//     };
//
//     const addFile = (e) => {
//         if (e.target.files[0]) {
//             setAudio(URL.createObjectURL(e.target.files[0]));
//         }
//     };
//
//     return (
//         <div>
//             <button onClick={handleClick}>{buttonName}</button>
//             <input type="file" onChange={addFile} />
//         </div>
//     );
// }
//
// export default AudioPlay;
