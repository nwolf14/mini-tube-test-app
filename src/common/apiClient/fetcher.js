import { getConfig } from '../helpers';

const BASE_API_URL = getConfig('BASE_API_URL');

const FETCH_DEFAULTS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': typeof window !== "undefined" ? localStorage.getItem('token') : ''
  },
};

const STATUS_CODES = {
  NO_CONTENT: 204,
  OK: 200,
};

const JSON_CONTENT_TYPE_PATTERN = /application\/json/;

class Fetcher {
  static handleResponse(response) {
    return Fetcher._isJson(response) ? Fetcher._parseJson(response) : response;
  }

  fetch(url, initOptions = {}) {
    if (typeof url !== 'string') {
      throw new Error('Fetcher: Missing mandatory parameter `url`');
    }

    return window.fetch(url, Object.assign({}, FETCH_DEFAULTS, initOptions));
  }

  fetchJson(url, initOptions = {}) {
    return this.fetch(url, initOptions)
      .then(this._checkStatus.bind(this))
      .then(response => Fetcher.handleResponse(response))
      .catch(error => console.error(error));
  }


  get(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, { method: 'GET' }));
  }

  post(url, initOptions = {}, body = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, { method: 'POST' }, { body: JSON.stringify(body) }));
  }

  // put(url, initOptions = {}) {
  //   return this.fetchJson(url, Object.assign({}, initOptions, { method: 'PUT' }));
  // }

  // update(url, initOptions = {}) {
  //   return this.fetchJson(url, Object.assign({}, initOptions, { method: 'UPDATE' }));
  // }

  // patch(url, initOptions = {}) {
  //   return this.fetchJson(url, Object.assign({}, initOptions, { method: 'PATCH' }));
  // }

  // delete(url, initOptions = {}) {
  //   return this.fetchJson(url, Object.assign({}, initOptions, { method: 'DELETE' }));
  // }

  buildUrl(route, parameters = {}) {
    let qs = "";
    let url;
    for (let key in parameters) {
      const value = parameters[key];

      qs += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&"`;
    }
    url = `${BASE_API_URL}${route}`;

    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1);
      url = url + `?${qs}`;
    }
    return url;
  }

  _checkStatus(response) {
    // if (!response.ok) {
    //   const error = new Error(response.statusText);
    //   error.response = response;
    //   throw error;
    // }

    return response;
  }

  static _isJson(response) {
    const contentType = response.headers.get('content-type');
    return contentType && contentType.match(JSON_CONTENT_TYPE_PATTERN) && response.status !== STATUS_CODES.NO_CONTENT;
  }

  static _parseJson(response) {
    return response.json();
  }
}
export default new Fetcher();
