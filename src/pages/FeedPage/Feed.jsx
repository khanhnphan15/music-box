import PageHeader from "../../components/Header/Header";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostGallery from "../../components/PostGallery/PostGallery";

import { Grid } from "semantic-ui-react";

export default function FeedPage() {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPuppyForm />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostGallery />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
