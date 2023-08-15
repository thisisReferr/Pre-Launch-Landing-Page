import { APIService } from "../../utils/apiService";
class HeroSection extends HTMLElement {
  static cache = {
    html: null,
    css: null,
  };
  #api = null;
  async connectedCallback() {
    this.#api = new APIService();
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

  async getNotifiedEventHandler(e) {
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
    try {
      await this.#api.collectEmail(email);
    } catch (e) {
      console.error(
        "Failed to collect email: " + email + " Because of error: " + e.message,
      );
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
