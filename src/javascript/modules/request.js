class Request {
  static get(endpoint, body, options) {
    return this.request("GET", endpoint, body, options);
  }

  static post(endpoint, body, options) {
    return this.request("POST", endpoint, body, options);
  }

  static delete(endpoint, options) {
    return this.request("DELETE", endpoint, options);
  }

  static request(method, api, body, additionalOptions) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (additionalOptions) {
      Object.assign(options, additionalOptions);
      const { headers } = additionalOptions;
      if (headers) {
        Object.assign(options.headers, headers);
      }
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(api, options)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        return err;
      });
  }
}

export default Request;
export { Request };
