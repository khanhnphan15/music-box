import tokenService from "./tokenService";

const BASE_URL = '/api/playlists';

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
