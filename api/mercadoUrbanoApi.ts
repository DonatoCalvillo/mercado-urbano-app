import axios from 'axios'

const mercadoUrbanoApi = axios.create({
  baseURL: 'http://localhost:3001/api',
})

export default mercadoUrbanoApi