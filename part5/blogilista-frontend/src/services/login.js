import axios from "axios";
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const verify = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(`${baseUrl}/verify`, '', config)
  return response.data
}

export default { login, verify }
