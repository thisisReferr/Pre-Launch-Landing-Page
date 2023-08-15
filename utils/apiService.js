export class APIService {
  #BASE_URL = "https://referr-test-deploy.abhigyanbaruah1.workers.dev";
  #DEFAULT_HEADERS = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  constructor(customHeaders = {}) {
    this.headers = new Headers({
      ...this.#DEFAULT_HEADERS,
      ...customHeaders,
    });
  }

  async collectEmail(email) {
    const endPoint = "/IDM/CreateRegisteredUser";
    const REQUEST_URL = this._constructURL(endPoint);
    const BODY = JSON.stringify({ email });

    const response = await this._fetchRequest(REQUEST_URL, BODY);
    return this._handleResponse(response);
  }

  _constructURL(endpoint) {
    return `${this.#BASE_URL}${endpoint}`;
  }

  async _fetchRequest(url, body) {
    try {
      return await fetch(url, {
        method: "POST",
        body: body,
        headers: this.headers,
      });
    } catch (err) {
      console.error("Network error:", err.message);
      throw new Error("Network error occurred while making the request.");
    }
  }

  async _handleResponse(response) {
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }
}
