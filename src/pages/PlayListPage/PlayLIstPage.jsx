import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom"; // Import useNavigate
import Header from "../../components/Header/Header";
import './PlayListPage.css'; // Import the CSS file
import * as playlistApi from '../../utils/playlistApi';
import {Container, Button, Icon, Image, Input, List} from 'semantic-ui-react';

export default function PlayListPage({user, handleLogout}) {
    const {id} = useParams(); // Get the id parameter
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [playlists, setPlaylists] = useState([]);
    const getPlaylists = async () => {
        try {
            const data = await playlistApi.getAll();
            setPlaylists(data.playlists);
        } catch (error) {
            console.error("Error fetching playlist:", error);
        }
    };
    useEffect(() => {
        getPlaylists().then(r =>{} );
    }, []);
    const handleOpenButtonClick = (playlist) => {
        navigate(`/playlists/detail/${playlist._id}`);
    };
    return (
        <div className="playlist-background">
            <Header handleLogout={handleLogout} user={user} />
            <div className="page-inner-wrapper">
                <div className="html ui top attached segment playlist-wrapper">
                    <div className="ui middle aligned divided list">
                        {playlists.length === 0 ? (
                            <div>You have not created any playlists</div>
                        ) : (
                            playlists.map((playlist, index) => (
                                <div key={index} className="item list-view-item">
                                    <div className="item list-view-item">
                                        <div className="justify-left">
                                            <div className="name-and-avatar">
                                                <img className="ui avatar image" src={playlist.imageUrl}/>
                                                <div className="content">
                                                    {playlist.artistName}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right floated content justify-right">
                                            <div className="ui button" onClick={() => handleOpenButtonClick(playlist)}>Open</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="ui top attached label table-header">
                        <div className="right floated content">
                            <button onClick={() => navigate('/playlists/create')} className= "ui inverted secondary basic button">Add Playlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
