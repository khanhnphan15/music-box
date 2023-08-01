import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';

export function create(data) {
	return fetch(BASE_URL, {
		method: 'POST',
		body: data,
		headers: {
			// convention for sending jwts

			Authorization: "Bearer " + tokenService.getToken()
		}
	}).then(responseFromTheServer => {
		if (responseFromTheServer.ok) return responseFromTheServer.json() // so if everything went well in the response return 
		//the parsed json to where we called the function

		throw new Error('Something went wrong in create Post'); // this will go to the catch block when we call the function in the AddPostPuppyForm
		// handleSubmit
	})
}

export function getAll() {
	return fetch(BASE_URL, {
		method: 'GET',
		headers: {
			// convention for sending jwts
			Authorization: "Bearer " + tokenService.getToken()
		}
	}).then(responseFromTheServer => {
		if (responseFromTheServer.ok) return responseFromTheServer.json() 
		throw new Error('Something went wrong in getAll posts, check the terminal!'); // this will go to the catch block when we call the function in the AddPostPuppyForm
		// handleSubmit
	})
}