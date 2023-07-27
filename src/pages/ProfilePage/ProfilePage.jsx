import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay";
import PageHeader from "../../components/Header/Header";

import userService from "../../utils/userService";

export default function ProfilePage() {


 // grabbing the param from this route
 //  <Route path="/:username" element={<ProfilePage />} />
 const { username } = useParams()
 console.log(username)
 

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <ProfilePostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
