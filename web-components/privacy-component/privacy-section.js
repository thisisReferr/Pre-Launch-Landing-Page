class PrivacySection extends HTMLElement {
  static cache = {
    html: null,
    css: null,
  };

  async connectedCallback() {
    // Check cache first
    if (!PrivacySection.cache.html || !PrivacySection.cache.css) {
      const [htmlResponse, cssResponse] = await Promise.all([
        fetch("./web-components/privacy-component/privacy-template.html"),
        fetch("./styles/privacy-style.css"),
      ]);

      PrivacySection.cache.html = await htmlResponse.text();
      PrivacySection.cache.css = await cssResponse.text();
    }

    // Set the innerHTML of the component using the cached template
    const style = document.createElement("style");
    style.textContent = PrivacySection.cache.css;

    // Shadow DOM encapsulation, to isolate styles
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = PrivacySection.cache.html;
    this.shadowRoot.appendChild(style);
  }
}

// Define the custom element
customElements.define("privacy-section", PrivacySection);
