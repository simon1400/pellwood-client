import axios from 'axios'

export const API_ENDPOINT = process.env.REACT_APP_API

export const AxiosAPI = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
