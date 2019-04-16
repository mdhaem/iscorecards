import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://scorecards-482b8.firebaseio.com/'
});

export default instance;