// import React, { useEffect, useState } from "react";
// import { Card, Container } from "semantic-ui-react";
// import { getAllSongs } from "../../api/songApi";
//
// export default function SongsPage() {
//     const [songs, setSongs] = useState([]);
//
//     useEffect(() => {
//         fetchSongs();
//     }, []);
//
//     async function fetchSongs() {
//         console.log('uuuuuuuu');
//         debugger
//         try {
//             debugger
//             const songsData = await getAllSongs();
//             debugger
//             setSongs(songsData);
//         } catch (error) {
//             debugger
//             console.error("Error fetching songs:", error);
//         }
//     }
//
//     return (
//         <Container>
//             <h1>Play List</h1>
//             <Card.Group>
//                 {songs.map(song => (
//                     <Card key={song._id}>
//                         <Card.Content>
//                             <Card.Header>{song.title}</Card.Header>
//                             <Card.Meta>{song.artist}</Card.Meta>
//                             <Card.Description>{song.description}</Card.Description>
//                         </Card.Content>
//                         {song.audioUrl && (
//                             <audio controls>
//                                 <source src={song.audioUrl} type="audio/mpeg" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                         )}
//                     </Card>
//                 ))}
//             </Card.Group>
//         </Container>
//     );
// }
