/** Auth.js
 *    A file used to make calls to the API pertaining to authorization/authentication
 */

class AuthService {
  async login(email, password) {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': email, 'password': password })
    }
    const response = await fetch('/user/login', reqOptions);
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }
    window.location.reload(false);
    return data;
  }

  async register(email, password) {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': email, 'password': password })
    }
    const response = await fetch('/user/register', reqOptions);
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }
    window.location.reload(false);
    return data;
  }

  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }

  getCurrentToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  /**
   * get
   * a method that sends an authorized HTTP get request to the flask server
   *  token is embedded in the request, so authorization is solved
   * @param {*} route the flask route to send the request
   * @param {*} params a dictionary containing parameters to send
   * @returns a promise that returns the JSON of the response
   */
  async get(route, params) {
    if (localStorage.getItem('token') == null) return null;
    const reqOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
    return fetch(route + new URLSearchParams(params), reqOptions)
            .then(response => response.json())
  }

  /**
   * post
   * a method that sends an authorized HTTP post request to the flask server
   *  token is embedded in the request, so authorization is solved
   * @param {*} route the flask route to send the request
   * @param {*} params a dictionary containing parameters to send
   * @returns a promise that returns the JSON of the response
   */
  async post(route, params) {
    if (localStorage.getItem('token') == null) return null;
    const reqOptions = {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
    return fetch(route, reqOptions)
            .then(response => response.json())
  }
}

export default new AuthService();