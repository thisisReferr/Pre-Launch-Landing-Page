class APIService {
  #headers = {};
  #BASE_URL = "https://referr-test-deploy.abhigyanbaruah1.workers.dev";

  constructor(headers = {}) {
    this.#headers = new Headers(headers);
  }

  async collectEmail(email) {
    const endPoint = "/IDM/CreateRegisteredUser";
    const REQUEST_URL = this.#BASE_URL + endPoint;
    const BODY = { email };

    try {
      const response = await fetch(REQUEST_URL, {
        method: "POST",
        body: JSON.stringify(BODY),
        headers: this.#headers,
        mode: "no-cors", // <-- Use this if needed, but be aware of its limitations.
      });

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message,
      );
      throw error; // You can re-throw the error if you want to handle it elsewhere.
    }
  }
}

class HeroSection extends HTMLElement {
  static cache = {
    html: null,
    css: null,
  };

  async connectedCallback() {
    // Check cache first
    if (!HeroSection.cache.html || !HeroSection.cache.css) {
      const [htmlResponse, cssResponse] = await Promise.all([
        fetch("./web-components/hero-component/hero-template.html"),
        fetch("./styles/hero-banner.css"),
      ]);

      HeroSection.cache.html = await htmlResponse.text();
      HeroSection.cache.css = await cssResponse.text();
    }

    // Set the innerHTML of the component using the cached template
    const style = document.createElement("style");
    style.textContent = HeroSection.cache.css;

    // Shadow DOM encapsulation, to isolate styles
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = HeroSection.cache.html;
    this.shadowRoot.appendChild(style);

    // Events listeners
    const emailInput = this.shadowRoot.getElementById("emailInput");
    const notifiedForm = this.shadowRoot.getElementById("notifiedForm");
    emailInput.addEventListener("input", this.handleInputEvent.bind(this));
    emailInput.addEventListener("focus", this.handleFocusEvent.bind(this));
    emailInput.addEventListener("blur", this.handleBlurEvent.bind(this));
    notifiedForm.addEventListener(
      "submit",
      this.getNotifiedEventHandler.bind(this),
    );
  }

  handleInputEvent(e) {
    const emailInput = e.target;
    const { value } = emailInput;
    const email = value.trim();

    emailInput.classList.remove("valid", "invalid", "email-exists", "active");

    if (email === "") return;

    if (emailInput.validity.valid) {
      emailInput.classList.add("valid");
    } else {
      emailInput.classList.add("invalid");
    }
  }

  getNotifiedEventHandler(e) {
    e.preventDefault();
    const emailInput = this.shadowRoot.getElementById("emailInput");
    const { value } = emailInput;
    const email = value.trim();

    if (!this.isValidEmail(email)) {
      emailInput.classList.add("invalid");
      return;
    }

    if (this.emailExists(email)) {
      emailInput.classList.replace("valid", "email-exists");
      return;
    }
    const api = new APIService({});
    api.collectEmail(email);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  emailExists(email) {
    const existingEmails = ["example@example.com"];
    return existingEmails.includes(email);
  }

  handleFocusEvent(e) {
    e.target.classList.add("active");
  }

  handleBlurEvent(e) {
    e.target.classList.remove("active");
  }
}

// Define the custom element
if (!customElements.get("hero-section")) {
  customElements.define("hero-section", HeroSection);
}
