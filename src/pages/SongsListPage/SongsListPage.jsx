import React, {useEffect, useState} from "react";
import { Card, Container, Button, Icon } from "semantic-ui-react";
import * as songApi from "../../utils/songApi";
import Header from "../../components/Header/Header";
import './SongListPage.css';

export default function SongListPage() {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState("");
    const [deleteCount, setDeleteCount] = useState(0);

    useEffect(() => {
        fetchSongs().then(r => {
        });
    }, [deleteCount]);
    async function fetchSongs() {
        try {
            const songsData = await songApi.getAll();
            setSongs(songsData.songs);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    }
    async function removeSong(songId) {
        try {
            // Make an API call to remove the song by its ID
           const response = await songApi.removeSong(songId);
           setDeleteCount(deleteCount + 1);
            // Update state by fetching songs again
        } catch (error) {
            setError('Error removing song:')
            console.error("Error removing song:", error);
        }
    }

    return (
        <div>
            <Header /> {/* Include your Header component */}
            <Container className="song-wrapper">
                <h1>Song List</h1>
                {/*<Button icon>*/}
                {/*    <a href="/upload">*/}
                {/*        <Icon name='upload' />*/}
                {/*    </a>*/}
                {/*</Button>*/}
                <Card.Group className="centered-card-group">
                    {songs.map((song) => (
                        <Card key={song._id} className="song-card">
                            <Card.Content className="song-list">
                                <Card.Header>{song.title.slice(0, 24)}{song.title.length>24 ? '...' :  ''}</Card.Header>
                                <Card.Meta>{song.artistName}</Card.Meta>
                                <Card.Description>{song.description}</Card.Description>
                                <div className="buttons">
                                    <Button icon onClick={() => removeSong(song._id)} className="delete-button" size= "mini" >
                                        <Icon name='delete' />
                                    </Button>
                                </div>
                                {/* Audio controls */}
                                <div className= "audio-bar">
                                    {song.url && (
                                        <audio controls>
                                            <source src={song.url} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </div>

                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Container>
        </div>
    );
}


