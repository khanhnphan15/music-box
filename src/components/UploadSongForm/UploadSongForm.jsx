import React, {useState} from "react";
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import './UploadSongForm.css'; // Import the CSS file

// handleAddPost comes as prop from the app component
export default function UploadSongForm({handleAddPost}) {

    // const [state, setState] = useState({
    //     caption: ''
    // })
    //
    // const [selectedFile, setSelectedFile] = useState('')
    //
    // function handleFileInput(e) {
    //     setSelectedFile(e.target.files[0])
    // }
    //
    // function handleChange(e) {
    //     setState({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     })
    // }
    //
    // // The function that handles the changes on the input, Look at the inputs for the name of it
    //
    // function handleSubmit(e) {
    //     // Since we are sendinga file, prepare the object as formData to send to the server
    //     const formData = new FormData()
    //     formData.append('caption', state.caption)
    //     formData.append('photo', selectedFile)
    //
    //     // call handleAddPost, which calls our postsApi.create function in the utils folder
    //     handleAddPost(formData)
    // }

    return (
        <div className= "intro">
            <h1>Listen to your favorite songs</h1>
        </div>
    );
}
