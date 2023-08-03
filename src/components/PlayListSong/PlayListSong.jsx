import React from 'react';
// import './PlayListSong.css'; // Import the CSS file
import { Container, Header, Segment } from 'semantic-ui-react';

export default function PlayListSong() {
    return (
        <Container text>
            <Segment>
                <Header>Logout Successful</Header>
                <p>You have been successfully logged out.</p>
            </Segment>
        </Container>
    );
}
