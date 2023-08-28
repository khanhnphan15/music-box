import React from "react";
import "./LoginPage.css";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import userService from "../../utils/userService";

export default function LoginPage({ handleSignUpOrLogin }) {

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  // this function takes a path defined in App.js for our routes
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state)// making the http request to the server
      navigate('/')
      handleSignUpOrLogin();
    } catch (err) {
      console.log(err)
      setError('check terminal and console')
    }

  }
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle" className="login-container">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src="https://assets.dryicons.com/uploads/vector/preview/9349/large_2x_colorful_music.jpg" /> LogIn
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="btn">
              Login
            </Button>
          </Segment>
          <Message>
            New to Us? <Link to="/signup">Sign up</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
