import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

export default function LogoutPage() {
  return (
    <Container text>
      <Segment>
        <Header as="h2">Logout Successful</Header>
        <p>You have been successfully logged out.</p>
      </Segment>
    </Container>
  );
}
