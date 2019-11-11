import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://miniwp-server.ahmadfd.site'
})

export default instance
