class TCSection extends HTMLElement {
  static cache = {
    html: null,
    css: null,
  };

  async connectedCallback() {
    // Check cache first
    if (!TCSection.cache.html || !TCSection.cache.css) {
      const [htmlResponse, cssResponse] = await Promise.all([
        fetch(
          "./web-components/terms-and-conditions-component/terms-and-condition-template.html",
        ),
        fetch("./styles/tc-style.css"),
      ]);

      TCSection.cache.html = await htmlResponse.text();
      TCSection.cache.css = await cssResponse.text();
    }

    // Set the innerHTML of the component using the cached template
    const style = document.createElement("style");
    style.textContent = TCSection.cache.css;

    // Shadow DOM encapsulation, to isolate styles
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = TCSection.cache.html;
    this.shadowRoot.appendChild(style);
  }
}

// Define the custom element
customElements.define("tc-section", TCSection);
