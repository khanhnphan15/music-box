import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from '../../components/PostGallery/PostGallery'
import PageHeader from "../../components/Header/Header";

import userService from "../../utils/userService";

import * as likesApi from "../../utils/likeApi";

export default function ProfilePage({user}) {
  const [posts, setPosts] = useState([]);
  const [userState, setUserState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // grabbing the param from this route
  //  <Route path="/:username" element={<ProfilePage />} />
  const { username } = useParams();
  console.log(username);


    // EVERY TIME WE UPDATE STATE here, We will first make http request to the server
  // to try and perform some CRUD operation.
  async function addLike(postId){
    try {
      const response = await likesApi.create(postId);
      // to update state we are just going to refetch the posts, because they will the updated
      // likes
      getProfile(); // this funciton updates state

    } catch(err){
      setError('error creating like')
      console.log(err, ' error')
    }
  }
  
  async function removeLike(likeId){
    try {
      const response = await likesApi.removeLike(likeId);
      // to update state we are just going to refetch the posts, because they will the updated
      // likes
      getProfile(); // this funciton updates state

    } catch(err){
      setError('error creating like')
      console.log(err, ' error')
    }
  }


  async function getProfile() {
    // make the api call,
    // then log the response,
    // then update the state

    try {
      setLoading(true);
      const response = await userService.getProfile(username);
      console.log(response);
      setPosts(response.posts);
      setUserState(response.user);
      setLoading(false)
    } catch (err) {
      setError("Error loading profile");
      console.log(err, " err in profile");
    }
  }


  useEffect(() => {
   
    getProfile();
  }, []);

  if (loading) {
    return (
      <>
        <PageHeader />
        <h1>Loading....</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={userState} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostGallery posts={posts} itemsPerRow={3} isProfile={true} user={user} addLike={addLike} removeLike={removeLike}/> 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
