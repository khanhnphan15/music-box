import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Button, Icon, Image, Input, List} from 'semantic-ui-react';
import {MdSearch} from 'react-icons/md';
import {getPlaylistDetail} from '../../utils/playlistApi';
import * as songsApi from '../../utils/songApi';

export default function PlayListDetailPage() {
    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [myPlayList, setMyPlaylist] = useState([]);

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
            clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
            setTimeoutId(newTimeoutId);
        };
    };

    useEffect(() => {
        fetchPlaylistDetail();
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

    const addToPlayList = (song) => {
        if (myPlayList.some(existingSong => existingSong._id === song._id)) {
            console.log(`"${song.title}" is already added to My Page.`);
            return;
        }
        setMyPlaylist([...myPlayList, song]);
        console.log(`Added "${song.title}" to My Page.`);
    };

    return (
        <div className="detail-background">
            <Container>
                {playlist && (
                    <div className="playlist-detail-wrapper">
                        <Image className="playlist-image" src={playlist.imageUrl} alt="Playlist Cover"/>
                        <div>
                            <h2>{playlist.name}</h2>
                        </div>
                    </div>
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
                                <List.Content floated='left'>
                                    <Button icon onClick={() => playSong(song)}>
                                        <Icon name={currentSong === song ? 'pause' : 'play'}/>
                                    </Button>
                                </List.Content>
                                <Image floated='left' avatar src={song.imageUrl}/>
                                <List.Content floated='left' style={{marginLeft: '1rem'}}>
                                    {song.title}
                                </List.Content>
                                <List.Content floated='right'>
                                    <Button onClick={() => addToPlayList(song)}>
                                        <Icon name='add'/>
                                    </Button>
                                </List.Content>
                                <List.Content>
                                    {currentSong === song && (
                                        <audio controls src={song.url} style={{marginLeft: '1rem'}}/>
                                    )}
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </Container>
        </div>
    );
}
