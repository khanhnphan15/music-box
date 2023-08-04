import { useState, uesEffect, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import UploadSongForm from "../../components/UploadSongForm/UploadSongForm";
import "./HomePage.css";
import { Grid } from "semantic-ui-react";
import * as postsApi from "../../utils/postApi";


export default function HomePage({user, handleLogout}) {

  const [posts, setPosts] = useState([])
  const [error, setError] = useState("");
  async function handleAddPost(data) {
    try {
      const responseData = await postsApi.create(data);
      console.log(responseData, " <- response from server in handleAddPost");
      setPosts([responseData.data, ...posts]); 
    } catch (err) {
      console.log(err, " err in handleAddPost HomePage");
      setError("Error Creating a Post! Please try again");
    }
  }

  // C(R)UD
  async function getPosts() {
    try {
      const responseFromTheServer = await postsApi.getAll(); 
      console.log(responseFromTheServer);
      setPosts(responseFromTheServer.posts);
    } catch (err) {
      console.log(err, " err in getPosts");
      setError("Error Fetching Posts, Check terminal");
    }
  }

  useEffect(() => {
    getPosts().then(r => {});
  }, []); 

  return (
    <Grid centered className="feed-page">
      <div className="background-image"></div>
      <Grid.Row>
        <PageHeader handleLogout={handleLogout} user={user}/>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <UploadSongForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
