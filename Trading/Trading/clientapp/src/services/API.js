import axios from 'axios'
import { store } from '../Store'

const headers = () => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    DBEnv: store.getState().config.env,
  }
}

const API = () => {
  const axiosInstance = axios.create({
    headers: headers(),
  })

  return axiosInstance
}

export default API
