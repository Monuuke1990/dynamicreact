import {data} from './userData';
import axios from 'axios';

const baseUrl = "http://localhost:1337";
 const getUsers = async () => {
//   console.log(json);
    const url = baseUrl + '/profiles';
    return axios.get(url);
  }

  const getUserById = (id) => {
    return data.filter(user=>user.id === id)[0] 
  }



  const setData = (user) =>{
    const url = baseUrl + '/profiles';
    return axios.post(url, user);
  }

  export default {
    getUsers,
    getUserById,
    setData
  }