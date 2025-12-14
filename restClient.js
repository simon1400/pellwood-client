import axios from 'axios'

// Определяем baseURL в зависимости от того, где выполняется код
const getBaseURL = () => {
  // Если код выполняется на сервере (Node.js)
  if (typeof window === 'undefined') {
    return process.env.APP_API || 'http://localhost:3001/api'
  }
  // Если код выполняется в браузере
  return '/api'
}

export const AxiosAPI = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
