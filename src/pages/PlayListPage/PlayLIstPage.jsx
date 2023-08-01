import {Button, Form, Grid, Segment, Container, Header} from "semantic-ui-react";
import './PlayListPage.css'; // Import the CSS file
import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {MdDeleteForever} from "react-icons/md";
// import { FetchContext } from "../Context/FetchContext";
// import { SongContext } from "../Context/SongContext";
// import PlaylilstSong from "../components/PlaylilstSong";

export default function PlaylistPage() {
    // const Playlist = () => {
    //     const {id} = useParams();  //getting the id from the url
    //     const navigate = useNavigate(); // for navigation
    //     const [playList, setPlayList] = useState(null); // state for the playlist
    //     const [loading, setLoading] = useState(false);
    //     const {fetchPlaylist} = useContext(FetchContext)
    //     const {__URL__} = useContext(SongContext)
    const {id} = useParams();
    const navigate = useNavigate();

    const [playList, setPlayList] = useState(null);
    const [loading, setLoading] = useState(true); // Define the loading variable

    // useEffect(() => {
    //     // Fetch the playlist data when the component mounts
    //     const fetchPlaylistData = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:1337/api/v1/playlist/${id}`
    //             );
    //             setPlayList(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching playlist data:", error);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchPlaylistData();
    // }, [id]);
    //
    // // Delete playlist
    // const deletePlaylist = async () => {
    //     try {
    //         await axios.delete(`http://localhost:1337/api/v1/playlist/delete/${id}`);
    //         alert("Playlist deleted successfully");
    //         navigate("/playlists");
    //     } catch (error) {
    //         console.error("Error deleting playlist:", error);
    //     }
    // };

    return loading || playList === null ? (
        <div>Loading...</div>
    ) : !loading && playList !== null ? (
        <div className="bg-slate-800 text-white p-5 min-h-screen space-y-5 flex flex-col lg:items-center">
            <div className="lg:mt-10 flex justify-between items-center px-1 lg:w-[70vw]">
                <div>
                    <h2 className="text-xl lg:text-4xl">{playList.playlistName}</h2>
                    <p className="text-md lg:text-lg`">Songs - {playList.songs.length} </p>
                </div>
                <div>
                    <button onClick={handleDelete}>
                        <MdDeleteForever size={25}/>
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                {playList.songs.length === 0 ? (
                    <div>No songs in this playlist</div>
                ) : (
                    playList.songs.map((song, index) => {
                        return (
                            <PlaylilstSong
                                key={index}
                                title={song.title}
                                artistName={song.artistName}
                                songSrc={song.songSrc}
                                playlistId={id}
                            />
                        );
                    })
                )}
            </div>
        </div>
    ) : null;
};
