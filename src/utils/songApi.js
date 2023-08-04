import tokenService from "./tokenService";

const BASE_URL = '/api/songs/';

export async function create(data) {
    console.log("Creating a post...");

    try {
        const responseFromTheServer = await fetch(BASE_URL, {
            method: 'POST',
            body: data,
            headers: {
                Authorization: "Bearer " + tokenService.getToken()
            }
        });

        console.log("Response from the server:", responseFromTheServer);

        if (responseFromTheServer.ok) {
            const responseData = await responseFromTheServer.json();
            return responseData;
        } else {
            throw new Error('Something went wrong in create Post');
        }
    } catch (error) {
        console.error("Error in create Post:", error);
        throw error;
    }
}
export async function getAll(opts = {}) {
    let url = BASE_URL;
    if ('filters' in opts) {
        let formattedFilters = opts.filters.map(i => `${i.fieldName}=${i.value}`);
        url = `${url}?${formattedFilters.join('&')}`;
    }
    try {
        const responseFromTheServer = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenService.getToken()
            }
        });

        if (responseFromTheServer.ok) {
            const data = await responseFromTheServer.json();

            try {
                const songsWithAudioUrl = data.songs.map(song => ({
                    ...song,
                    audioUrl: `s3://projects-6-5.s3.amazonaws.com/songs/${song.audioFileName}`
                }));
                return {songs: songsWithAudioUrl};
            } catch (error) {
                console.error("Error modifying audioUrl:", error);
                throw error;
            }
        } else {
            throw new Error('Something went wrong in getAll posts, check the terminal!');
        }
    } catch (error) {
        console.error("Error in getAll:", error);
        throw error;
    }
}
export function removeSong(songId, token) {
    return fetch(`${BASE_URL}${songId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
            // so the server knows who the request is coming from when the client is trying to make a POST
        },
    }).then(responseFromTheServer => {
        if (responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error('Something went wrong in delete Song');
    });
}
