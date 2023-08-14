export class APIService {
  #headers = {};
  #BASE_URL = "https://referr-test-deploy.abhigyanbaruah1.workers.dev";
  constructor(headers) {
    this.#headers = new Headers(this.#headers);
  }

  async collectEmail(email) {
    const endPoint = "/IDM/CreateRegisteredUser";
    const REQUEST_URL = this.#BASE_URL + endPoint;
    const BODY = { email };
    const collectEmailRequest = new Request(REQUEST_URL, {
      method: "POST",
      body: JSON.stringify(BODY),
      headers: JSON.stringify(this.#headers),
    });

    const { data } = await (await fetch(collectEmailRequest)).json();
    console.log(JSON.stringify(data));
  }
}
