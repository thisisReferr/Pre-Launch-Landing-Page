import { APIService } from "../../utils/apiService.js";

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
    const email = emailInput.value.trim();
    emailInput.classList.remove("valid", "invalid", "email-exists", "active");

    if (email && emailInput.validity.valid) {
      emailInput.classList.add("valid");
    } else {
      emailInput.classList.add("invalid");
    }
  }

  async getNotifiedEventHandler(e) {
    e.preventDefault();
    const emailInput = this.shadowRoot.getElementById("emailInput");
    const email = emailInput.value.trim();

    if (!this.isValidEmail(email)) {
      emailInput.classList.add("invalid");
      this.showToast({
        title: "Invalid email",
        message: "The Entered Email Is not a valid email",
        accent: "#ef4444",
        ioc: "fa-exclamation",
      });
      return;
    }

    try {
      const { statusCode, data } = await this.#api.collectEmail(email);
      if (statusCode === 200 && data) {
        this.showToast({
          title: "Success",
          message: "You're all set! We'll keep you updated on our launch.",
          accent: "#4070f4",
          ioc: "fa-check",
        });
        return;
      }

      if (statusCode === 422) {
        emailInput.classList.replace("valid", "email-exists");
        this.showToast({
          title: "Email Already Exists",
          message:
            "Looks like you're already on our list. Expect exciting news soon!",
          accent: "#0f172a",
          ioc: "fa-bell",
        });
      }
    } catch (e) {
      this.showToast({
        title: "Error",
        message: "Couldn't Add Email To Waiting List",
        accent: "#ef4444",
        ioc: "fa-exclamation",
      });
      console.error(`Failed to collect email: ${email}. Error: ${e.message}`);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  handleFocusEvent(e) {
    e.target.classList.add("active");
  }

  handleBlurEvent(e) {
    e.target.classList.remove("active");
  }

  showToast({ title, message, accent = "#4070f4", ioc }) {
    const toast = document.createElement("custom-toast");
    toast.setAttribute("title", title);
    toast.setAttribute("message", message);
    toast.setAttribute("accent-color", accent);
    toast.setAttribute("icon-class", `fas fa-solid ${ioc}`);
    document.body.appendChild(toast);
    toast.click();

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 5300);
  }
}

if (!customElements.get("hero-section")) {
  customElements.define("hero-section", HeroSection);
}
