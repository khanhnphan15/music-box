import tokenService from "./tokenService";
const BASE_URL = '/api/songs/';

export function create(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: data, // since we are sending over a file/audio, no need to jsonify, since we are sending a multipart/formdata request
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then(responseFromTheServer => {
        debugger
        if (responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error('Something went wrong in creating the song.');
    }).catch(err => {
        debugger
    });
}

export function getAllSongs() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then(responseFromTheServer => {
        if (responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error('Something went wrong in getting all songs, check the terminal!');
    });
}
