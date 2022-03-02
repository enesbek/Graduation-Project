import axios from 'axios';
import router from '../router'

const API_URL = 'http://localhost:5050/api/Authenticate/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('/user');
  }
  async register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      password: user.password
    })
    .then(response => {
      if(response.status == 200){
        router.push('/login')
      }
    })
    ;
  }
}

export default new AuthService();