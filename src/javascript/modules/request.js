class Request {
  /**
   * Make a GET request
   * @param {string} endpoint [url]
   * @param {object | string | json} body [request body]
   * @param {object} options [request options]
   */
  static get(endpoint, body, options) {
    return this.request('GET', endpoint, body, options)
  }

  /**
   * Make a POST request
   * @param {string} endpoint [url]
   * @param {object | string | json} body [request body]
   * @param {object} options [request options]
   */
  static post(endpoint, body, options) {
    return this.request('POST', endpoint, body, options)
  }

  /**
   * Make a DELETE request
   * @param {string} endpoint [url]
   * @param {object | string | json} body [request body]
   * @param {object} options [request options]
   */
  static delete(endpoint, options) {
    return this.request('DELETE', endpoint, options)
  }

  /**
   * Make a request
   * @param {GET | POST | PUT | DELETE} method [request Method]
   * @param {string} api [endpoint]
   * @param {object | string | json} body [request body]
   * @param {object} additionalOptions [additional headers]
   */
  static request(method, api, body, additionalOptions) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (additionalOptions) {
      Object.assign(options, additionalOptions)
      const { headers } = additionalOptions
      if (headers) {
        Object.assign(options.headers, headers)
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    return fetch(api, options)
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        return err
      })
  }
}

export default Request
export { Request }
