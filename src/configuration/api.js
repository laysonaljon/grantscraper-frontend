import axios from 'axios';

const DEFAULT_REQUEST_TIMEOUT = 120000;

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
});

const get = (url, params = {}, headers = {}, responseType) =>
  request.get(url, {
    headers: { ...headers },
    params,
    responseType,
  });

const post = (url, data = {}, params = {}, headers = {}, timeout = DEFAULT_REQUEST_TIMEOUT) =>
  request.post(url, data, {
    headers: { ...headers },
    params,
    timeout,
  });

const put = (url, data = {}, params = {}, headers = {}) =>
  request.put(url, data, {
    headers: { ...headers },
    params,
  });

const deleteRequest = (url, params = {}, headers = {}) =>
  request.delete(url, {
    headers: { ...headers },
    params,
  });

class Api {

  static getScholarships(params) {
    return get(`/scholarships`, params);
  }

  static getScholarship(scholarshipId) {
    return get(`/scholarships/${scholarshipId}`);
  }

  static addUserPreference(payload) {
    return post(`/users/subscribe/`, payload);
  }

  static searchKeyword(keyword) {
    return get(`/scholarships/search?keyword=${keyword}`);
  }

}

export default Api;
