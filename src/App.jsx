import {Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import {useState} from 'react'
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from './pages/FeedPage/Feed';
import PlaylistPage from "./pages/PlayListPage/PlayLIstPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SongsPage from "./pages/SongsPage/SongsPage";
import UploadSongPage from './pages/UploadSongPage/UploadSongPage'; // Import the UploadSongPage component
import userService from "./utils/userService";
// ANY Component rendered by a ROUTE, goes in the pages folder!
// Client side routing, Just for showing or hiding components based on the address
// in the url
function App() {

    // this will the get token from localstorage and decode it when the page loads up
    // and set it as our initial state
    // if there is a token, user will be the user object, if there is not token user will null
    const [user, setUser] = useState(userService.getUser());


    // update our state everytime someones signs up or logs in, (in handleSubmit of LoginPage and SignupPage)
    // so we want to make sure we get the most recent token being made
    function handleSignUpOrLogin() {
        setUser(userService.getUser())
    }


    function handleLogout() {
        userService.logout();// removing the jwt token from local storage.
        // set the user to null so we don't have the previously logged in user
        // in our state
        setUser(null)
    }


    if (!user) {
        // if the user is not logged in only render the following routes
        return (
            <Routes>
                <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>}/>
                <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>}/>
                <Route path="/*" element={<Navigate to='/login'/>}/>
            </Routes>
        )

    }

    // If the user is logged in render the following routes

    return (
        <Routes>
            <Route path="/" element={<FeedPage user={user} handleLogout={handleLogout}/>}/>
            <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>}/>
            <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>}/>
            <Route path="/upload" element={<UploadSongPage />} /> {/* Add the UploadSongPage route */}
            <Route path="/playlists" element={<PlaylistPage />} /> {/* Add the PlayList route */}
            <Route path="/songs" element={<SongsPage />} /> {/* Add the SongsPage route */}
            <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout}/>}/>
            {/*<Route path="/playlist" element={<PlayListPage handleLogout={handleLogout}/>}/>*/}
        </Routes>
    );
}

export default App;
