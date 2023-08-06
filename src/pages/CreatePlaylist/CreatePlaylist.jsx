import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Segment, Container } from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import './CreatePlaylist.css'; // Import the CSS file
import Header from "../../components/Header/Header";
import * as playlistApi from "../../utils/playlistApi";

export default function CreatePlaylist() {
    const navigate = useNavigate();
    const [file, setFile] = useState('')
    const [name, setName] = useState();

    function handleFileInput(e) {
        setFile(e.target.files[0])
        // Handle the selected file here
        console.log(file);
    }

    async function handleAddPost(data) {
        try {
            const responseData = await playlistApi.create(data);
            console.log(responseData, " <- response from server in handleAddPost");
            // Add your code to handle the response data from the server if needed
        } catch (err) {
            console.log(err, " err in handleAddPost HomePage");
            // Handle any error that occurred while creating a post
        }
    }
    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    // The function that handles the changes on the input, Look at the inputs for the name of it

    async function handleSubmit(e) {
        e.preventDefault();
        // Since we are sending file, prepare the object as formData to send to the server
        const formData = new FormData()
        formData.append("file", file);
        formData.append("name", name);

        try {
            await handleAddPost(formData);
            // Navigate to SongsPage after successful submission
            navigate("/playlists");
        } catch (error) {
            console.error("Error while submitting the audio file:", error);
            // Handle any error that occurred during the submission process
        }
    }

    return (
        <div className="upload-song">
            <Header />
            <Container text>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Cool Playlist"
                               onChange={(e) => setName(e.target.value)}
                               required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image File</label>
                        <input type="file" name="file" required onChange={handleFileInput}/>
                    </Form.Field>
                    <Button type="submit" className="btn">
                        SUBMIT
                    </Button>
                </Form>
            </Container>
        </div>

    );
};


