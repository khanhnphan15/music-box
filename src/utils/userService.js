import tokenService from './tokenService';

const BASE_URL = '/api/users/';
function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    body: user
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('Email already taken!');
    })
    // Parameter destructuring!
    .then(({ token }) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(creds)
  })
    .then(res => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error('Bad Credentials!');
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getProfile(username) {
  return fetch(`${BASE_URL}${username}`, {
    method: 'GET',
    headers: {
      // convention for sending jwts

      Authorization: "Bearer " + tokenService.getToken()
    }
  }).then(responseFromTheServer => {
    if (responseFromTheServer.ok) return responseFromTheServer.json()

    throw new Error('Something went wrong in getAll posts, check the terminal!');
  })
}

export default {
  signup,
  getUser,
  logout,
  login,
  getProfile
};