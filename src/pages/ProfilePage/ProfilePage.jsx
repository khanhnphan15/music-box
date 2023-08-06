import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBioPage/ProfileBioPage";
import Header from "../../components/Header/Header";
import userService from "../../utils/userService";

export default function ProfilePage({ user, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [userState, setUserState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //  <Route path="/:username" element={<ProfilePage />} />
  const { username } = useParams();
  console.log(username);

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
  }, [username]);

  if (loading) {
    return (
      <>
        <Header handleLogout={handleLogout} user={user} />
        <h1>Loading....</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={userState} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostGallery posts={posts} itemsPerRow={3} isProfile={true} user={user}  />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
