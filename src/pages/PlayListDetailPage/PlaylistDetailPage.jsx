import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Input, List } from 'semantic-ui-react';
import { MdSearch } from 'react-icons/md';
import { getPlaylistDetail } from '../../utils/playlistApi';
import * as songsApi from '../../utils/songApi';
import './PlayListDetailPage.css';

export default function PlayListDetailPage() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const fetchPlaylistDetail = async () => {
        try {
            const response = await getPlaylistDetail(id);
            setPlaylist(response.playlist);
        } catch (error) {
            console.error('Error fetching playlist detail:', error);
        }
    };

    const debounce = (func, delay) => {
        return function (...args) {
            clearTimeout(timeoutId); // Clear the existing timeout
            const newTimeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
            setTimeoutId(newTimeoutId); // Update the state with the new timeoutId
        };
    };

    useEffect(() => {
        fetchPlaylistDetail().then(r => {});
    }, []);

    // Define the debounced function outside the useEffect
    const debouncedSearch = debounce(async (searchTerm) => {
        if (searchTerm) {
            const searchOpts = {
                filters: [
                    {
                        fieldName: 'artistName',
                        value: searchTerm,
                    },
                    {
                        fieldName: 'title',
                        value: searchTerm,
                    },
                ],
            };
            const songData = await songsApi.getAll(searchOpts);
            setFilteredSongs(songData.songs);
        } else {
            // Handle the case where searchTerm is empty
            setFilteredSongs([]);
        }
    }, 300);

    useEffect(() => {
        // Call the debounced function whenever searchTerm changes
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    const playSong = (song) => {
        if (currentSong === song) {
            setCurrentSong(null);
        } else {
            setCurrentSong(song);
        }
    };

    return (
        <Container>
            {playlist && (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Image style={{ width: '150px' }} src={playlist.imageUrl} alt="Playlist Cover" />
                    <h2>{playlist.name}</h2>
                </div>
            )}

            <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <MdSearch size={20} />
                    <span style={{ marginLeft: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}>
            Let's find something for your playlist
          </span>
                    <Input
                        placeholder="Search for songs"
                        value={searchTerm}
                        onInput={e => setSearchTerm(e.target.value)}
                        style={{ marginLeft: '0.5rem' }}
                    />
                </div>

                <List divided verticalAlign='middle'>
                    {filteredSongs.map(song => (
                        <List.Item key={song._id}>
                            <List.Content floated='right'>
                                <button onClick={() => playSong(song)}>
                                    {currentSong === song ? 'Pause' : 'Play'}
                                </button>
                            </List.Content>
                            <Image avatar src={song.imageUrl} />
                            <List.Content>
                                {song.title}
                                {currentSong === song && (
                                    <audio controls src={song.url} style={{ marginLeft: '1rem' }} />
                                )}
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        </Container>
    );
}
