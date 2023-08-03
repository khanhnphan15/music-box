import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Input, List } from 'semantic-ui-react';
import { MdSearch } from 'react-icons/md';
import { getPlaylistDetail } from '../../utils/playlistApi';
import './PlayListDetailPage.css';
export default function PlayListDetailPage() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);

    const fetchPlaylistDetail = async () => {
        try {
            const response = await getPlaylistDetail(id);
            setPlaylist(response.playlist);
            setFilteredSongs(response.playlist.songs);
        } catch (error) {
            console.error('Error fetching playlist detail:', error);
        }
    };

    useEffect(() => {
        fetchPlaylistDetail().then(r => {});
    }, []);

    useEffect(() => {
        if (playlist) {
            const filtered = playlist.songs.filter(song => {
                if (!searchTerm) {
                    return true;
                } else {
                    return song.title.toLowerCase().includes(searchTerm.toLowerCase())
                }
            });
            setFilteredSongs(filtered);
        }
    }, [searchTerm, playlist]); // Add 'playlist' as a dependency

    return (
        <Container>
            {playlist && (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Image style={{ width: '150px' }} src={playlist.imageUrl} alt="Playlist Cover" />
                    <h2>{playlist.name}</h2> {/* Display the playlist name */}
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

                <List>
                    {filteredSongs.map(song => (
                        <List.Item key={song._id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                            <button style={{ marginRight: '1rem' }}>Play</button>
                            <span style={{ flex: 1 }}>{song.title}</span>
                            <button>Add</button>
                        </List.Item>
                    ))}
                </List>
            </div>
        </Container>
    );
}
