import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://watermanagementsystem-env.eba-pthqxpm2.us-east-2.elasticbeanstalk.com/'
});

export default instance;
