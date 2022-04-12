import axios from "axios"

class AuthenticationService {
	API = "http://localhost:8080"

	signin = async (username, password) => {
		try {
			return axios
				.post(`${this.API}/api/auth/signin`, { username, password })
				.then((response) => {
					if (!response.error) {
						if (response.data) {
							localStorage.setItem("user", JSON.stringify(response.data))
						}
						return response.data
					} else {
						return response.error
					}
				})
				.catch((err) => {
					console.log(err)
					throw err
				})
		} catch (err) {
			console.log(err)
		}
	}

	signOut() {
		localStorage.removeItem("user")
	}

	register = async (firstname, lastname, username, email, password) => {
		return axios.post(`${this.API}/api/auth/signup`, {
			firstname,
			lastname,
			username,
			email,
			password,
		})
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"))
	}
}

export default new AuthenticationService()
