/** Auth.js
 *    A file used to make calls to the API pertaining to authorization/authentication
 */

class AuthService {
  async login(username, password) {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': 'test', 'password': 'test' })
    }
    const response = await fetch('/login', reqOptions);
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userID', data.userID);
    }
    return data;
  }

  async register(username, password) {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': 'test', 'password': 'test' })
    }
    const response = await fetch('/signin', reqOptions);
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userID', data.userID);
    }
    return data;
  }

  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }

  getCurrentUser() {
    return localStorage.getItem('userID');
  }

  getCurrentToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

  async get(route, params) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
    return fetch(route + new URLSearchParams(params), requestOptions)
            .then(response => response.json())
  }
}

export default new AuthService();