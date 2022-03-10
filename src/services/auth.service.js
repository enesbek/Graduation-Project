import axios from 'axios';
import router from '../router';
import store from '../store'

class AuthService {
  async login(user) {
    return axios.post(process.env.VUE_APP_API_URL + "Authenticate/login", {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if(response.status == 200){
        localStorage.setItem('user', JSON.stringify(response.data))
        router.push('dashboard')
        store.commit('changeSidebarState')
      }
    });
  }
  logout() {
    localStorage.removeItem('/user');
  }
  async register(user) {
    return axios.post(process.env.VUE_APP_API_URL + 'Authenticate/register', {
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
    });
  }
}

export default new AuthService();