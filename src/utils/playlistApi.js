import tokenService from "./tokenService";

const BASE_URL = '/api/playlists/';

export async function create(data) {
    console.log("Creating a playlist...");

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
            return await responseFromTheServer.json();
        } else {
            throw new Error('Something went wrong in create Post');
        }
    } catch (error) {
        console.error("Error in create Post:", error);
        throw error;
    }
}

export async function getAll() {
    try {
        const responseFromTheServer = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenService.getToken()
            }
        });

        if (responseFromTheServer.ok) {
            const data = await responseFromTheServer.json();
            return { playlists: data.playlists };
        } else {
            throw new Error('Something went wrong in getAll posts, check the terminal!');
        }
    } catch (error) {
        console.error("Error in getAll:", error);
        throw error;
    }
}
export async function getPlaylistDetail(id) {
    try {
        const responseFromTheServer = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + tokenService.getToken()
            }
        });

        if (responseFromTheServer.ok) {
            const data = await responseFromTheServer.json();
            return { playlist: data.playlist };
        } else {
            throw new Error('Error fetching playlist detail');
        }
    } catch (error) {
        console.error("Error fetching playlist detail:", error);
        throw error;
    }
}

export async function update(playlist) {
    try {
        const responseFromTheServer = await fetch(`${BASE_URL}/${playlist._id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenService.getToken()}`,
            }),
            body: JSON.stringify(playlist),
        });

        if (responseFromTheServer.ok) {
            const data = await responseFromTheServer.json();
            return { playlist: data.playlist };
        } else {
            throw new Error('Error fetching playlist detail');
        }
    } catch (error) {
        console.error("Error fetching playlist detail:", error);
        throw error;
    }
}

export function _delete(playlist, token) {
    return fetch(`${BASE_URL}${playlist._id}`, {
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

export async function deleteSong(playlistId, songId) {
    try {
        const responseFromTheServer = await fetch(`${BASE_URL}/${playlistId}/songs/${songId}`, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + tokenService.getToken()
            }
        });

        if (responseFromTheServer.ok) {
            return true; // Or you can return some other value indicating success
        } else {
            throw new Error('Something went wrong while deleting the song');
        }
    } catch (error) {
        console.error("Error deleting song:", error);
        throw error;
    }
}
