import React, {useState} from "react";
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import './UploadSongForm.css'; // Import the CSS file

// handleAddPost comes as prop from the app component
export default function UploadSongForm({handleAddPost}) {

    return (
        <div className= "intro">
            <h1>Listen to your favorite songs</h1>
        </div>
    );
}
