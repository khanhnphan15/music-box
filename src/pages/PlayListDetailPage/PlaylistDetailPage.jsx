import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Button, Icon, Image, Input, List} from 'semantic-ui-react';
import {MdSearch} from 'react-icons/md';
import {getPlaylistDetail} from '../../utils/playlistApi';
import * as songsApi from '../../utils/songApi';
import * as playlistApi from '../../utils/playlistApi';
import './PlaylistDetailPage.css';
import PlayButton from "../../components/PlayButton/PlayButton";
import Header from "../../components/Header/Header"; // Import the CSS file
export default function PlaylistDetailPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const addToPlayList = async (song) => {
        if (playlist.songs.find(s => s._id === song._id)) {
            console.error(`"${song.title}" is already added to My Page.`);
            return;
        }

        try {
            playlist.songs.push(song);
            await playlistApi.update(playlist);
            setPlaylist(prevPlaylist => ({
                ...prevPlaylist,
                songs: [...prevPlaylist.songs]
            }));
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }

    };
    const deleteSong = async (song) => {
        try {
            await playlistApi.deleteSong(playlist._id, song._id);
            setPlaylist(prevPlaylist => ({
                ...prevPlaylist,
                songs: prevPlaylist.songs.filter(s => s._id !== song._id)
            }));
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };
    const fetchPlaylistDetail = async () => {
        try {
            const response = await getPlaylistDetail(id);
            setPlaylist(response.playlist);
        } catch (error) {
            console.error('Error fetching playlist detail:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await playlistApi._delete(playlist);
            navigate('/playlists');
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    }

    const debounce = (func, delay) => {
        return function (...args) {
            clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
            setTimeoutId(newTimeoutId);
        };
    };

    useEffect(() => {
        fetchPlaylistDetail().then(r => {});
    }, []);

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
            setFilteredSongs([]);
        }
    }, 300);

    useEffect(() => {
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
        <div className="detail-background">
            <Header/>
            <Container>
                {playlist && (
                    <div className="playlist-detail-wrapper">
                        <Image className="playlist-image" src={playlist.imageUrl} alt="Playlist Cover"/>
                        <div className="playlist-details">
                            <h2>{playlist.name}</h2>
                            <Icon name="trash" onClick={handleDelete} />
                        </div>
                    </div>
                )}
                {playlist && (
                    <List divided verticalAlign='middle'>
                        {playlist.songs.map(song => <List.Item key={song._id}>
                            <List.Content>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: '1rem' }}>
                                        <PlayButton song={song} variation='no-outline' />
                                    </div>
                                    <div style={{ marginRight: '1rem' }}>
                                        <Image avatar src={song.imageUrl}/>
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'left' }}>
                                        {song.title}
                                    </div>
                                    <div>
                                        <Button onClick={() => deleteSong(song)}>
                                            <Icon name='trash'/>
                                        </Button>
                                    </div>
                                </div>
                            </List.Content>
                            <List.Content>
                                {/* Add your additional content here */}
                            </List.Content>
                        </List.Item>)}
                    </List>
                )}
                <div>
                    <h1>Let's find your songs for your playlist</h1>
                    <div className="ui category search">
                        <div className="ui icon input">
                            <input
                                className="prompt"
                                type="text"
                                placeholder="Search for songs..."
                                value={searchTerm}
                                onInput={e => setSearchTerm(e.target.value)}
                            />
                            <i className="search icon"></i>
                        </div>
                        {/* Optional: Add your search results component here */}
                    </div>
                    <List divided verticalAlign='middle'>
                        {filteredSongs.map(song => (
                            <List.Item key={song._id}>
                                <List.Content>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ marginRight: '1rem' }}>
                                            <PlayButton song={song} variation='no-outline' />
                                        </div>
                                        <div style={{ marginRight: '1rem' }}>
                                            <Image avatar src={song.imageUrl}/>
                                        </div>
                                        <div style={{ flex: 1, textAlign: 'left' }}>
                                            {song.title}
                                        </div>
                                        <div>
                                            <Button onClick={() => addToPlayList(song)}>
                                                <Icon name='add'/>
                                            </Button>
                                        </div>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    {/* Add your additional content here */}
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>

                </div>
            </Container>
        </div>
    );
}
