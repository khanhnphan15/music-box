import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from 'react'
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from './pages/FeedPage/Feed';
import PlaylistPage from "./pages/PlayListPage/PlayLIstPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SongsPage from "./pages/SongsPage/SongsPage";
import UploadSongPage from './pages/UploadSongPage/UploadSongPage'; // Import the UploadSongPage component
import userService from "./utils/userService";

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
        <Routes>
            <Route path="/" element={<FeedPage user={user} handleLogout={handleLogout} />} />
            <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/upload" element={<UploadSongPage />} /> {/* Add the UploadSongPage route */}
            <Route path="/playlists" element={<PlaylistPage />} /> {/* Add the PlayList route */}
            <Route path="/songs" element={<SongsPage />} /> {/* Add the SongsPage route */}
            <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout} />} />
            {/*<Route path="/playlist" element={<PlayListPage handleLogout={handleLogout}/>}/>*/}
        </Routes>
    );
}

export default App;
