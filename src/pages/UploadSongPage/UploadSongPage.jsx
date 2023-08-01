import React, {useState} from "react";
import {Button, Form, Grid, Segment, Container, Header} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import './UploadSongPage.css'; // Import the CSS file
import axios from "axios";
import * as postsApi from "../../utils/postApi";

export default function UploadSongPage() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        // Navigate to a specific path
        navigate("/songs");
    };
    // create the state, pay attention to how the inputs are setup!o
    const [state, setState] = useState({
        caption: ''
    })
    const [file, setFile] = useState('')
    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [album, setAlbum] = useState();
    const [description, setDescription] = useState();

    function handleFileInput(e) {
        setFile(e.target.files[0])
        // Handle the selected file here
        console.log(file);
    }

    async function handleAddPost(data) {
        try {
            const responseData = await postsApi.create(data);
            console.log(responseData, " <- response from server in handleAddPost");
            // Add your code to handle the response data from the server if needed
        } catch (err) {
            console.log(err, " err in handleAddPost FeedPage");
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
        formData.append('caption', state.caption)
        formData.append("file", file);
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("album", album);
        formData.append("description", description);

        try {
            await handleAddPost(formData);
            // Navigate to SongsPage after successful submission
            navigate("/songs");
        } catch (error) {
            console.error("Error while submitting the audio file:", error);
            // Handle any error that occurred during the submission process
        }
    }

    return (
        <div className="upload-song">
            <Container text>
                <Header as="h1" textAlign="center" style={{marginTop: "10px"}}>
                    Upload Song
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Hurt"
                               onChange={(e) => setTitle(e.target.value)}
                               required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input type="text" name="description" placeholder="Describe the song"
                               onChange={(e) => setDescription(e.target.value)} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Artist</label>
                        <input type="text" name="artist" placeholder="Jonny Cash"
                               onChange={(e) => setArtist(e.target.value)} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Cover Album</label>
                        <input type="text" name="album" placeholder="1970"
                               onChange={(e) => setAlbum(e.target.value)}
                               required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Audio File</label>
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


