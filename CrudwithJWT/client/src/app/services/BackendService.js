import axios from "axios"

// Add a request interceptor
axios.interceptors.request.use((config) => {
	const user = JSON.parse(localStorage.getItem("user"))

	if (user && user.accessToken) {
		const token = "Bearer " + user.accessToken
		config.headers.Authorization = token
	}

	return config
})
const API = "http://localhost:8080"
class BackendService {
	

	async getUserBoard() {
		return await axios.get(`${API}/api/test/user`)
	}

	async getPmBoard() {
		return await axios.get(`${API}/api/test/pm`)
	}

	async getAdminBoard() {
		return await axios.get(`${API}/api/test/admin`)
	}
}

export default new BackendService()
