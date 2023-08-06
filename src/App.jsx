import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from 'react'
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import PlayListPage from "./pages/PlayListPage/PlayListPage";
import SongsListPage from "./pages/SongsListPage/SongsListPage";
import UploadSongPage from './pages/UploadSongPage/UploadSongPage'; // Import the UploadSongPage component
import userService from "./utils/userService";
import PlaylistDetailPage from './pages/PlayListDetailPage/PlaylistDetailPage'; // Update the path accordingly
import { PlayerProvider } from './context/PlayerContext';
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";

function App() {

    const [user, setUser] = useState(userService.getUser());
    function handleSignUpOrLogin() {
        setUser(userService.getUser())
    }

    function handleLogout() {
        userService.logout();// removing the jwt token from local storage.
        setUser(null)
    }
    if (!user) {
        // if the user is not logged in only render the following routes
        return (
            <Routes>
                <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
                <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
                <Route path="/*" element={<Navigate to='/login' />} />
            </Routes>
        )

    }
    // If the user is logged in render the following routes

    return (
        <PlayerProvider>
            <div>
                <Routes>
                    <Route path="/" element={<PlayListPage user={user} handleLogout={handleLogout}  />} />
                    <Route path="/upload" element={<UploadSongPage user={user} handleLogout={handleLogout}/>} /> {/* Add the UploadSongPage route */}
                    <Route path="/playlists" element={<PlayListPage user={user} handleLogout={handleLogout}/>} /> {/* Add the PlayList route */}
                    <Route path="/playlists/create" element={<CreatePlaylist user={user} handleLogout={handleLogout}/>} /> {/* Add the Create Playlist route */}
                    <Route path="/playlists/detail/:id" element={<PlaylistDetailPage user={user} handleLogout={handleLogout}/>} /> {/* Add the PlayList route */}
                    <Route path="/songs" element={<SongsListPage user={user} handleLogout={handleLogout}/>} /> {/* Add the SongsPage route */}
                    {/*<Route path="/:username" element={<PlayListPage user={user} handleLogout={handleLogout} />} />*/}
                </Routes>
            </div>
        </PlayerProvider>
    );
}

export default App;
