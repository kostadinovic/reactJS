import axios from 'axios';

const AxiosInstance = axios.create({
    proxy:{
        host:"http://localhost",
        port:8080

    },
    timeout: 1000
})

export default AxiosInstance;