import axios from 'axios'

const api = axios.create({
    baseURL: 'https://3333-e2a21926-c37f-47d1-8d7f-be7fca037f76.ws-us02.gitpod.io/'
})

export default api