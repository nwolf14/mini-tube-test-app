import fetcher from './fetcher';

export default {
  get(route, options) {
    const url = fetcher.buildUrl(route, options);
    return fetcher.get(url);
  },
  post(route, body, options = {}) {
    const url = fetcher.buildUrl(route, options);
    return fetcher.post(url, {}, body);
  }
}