class PrivacySection extends HTMLElement {
  async connectedCallback() {
    // Fetch the external HTML template
    const response = await fetch(
      "./web-components/privacy-component/privacy-template.html",
    );
    const template = await response.text();

    // Set the innerHTML of the component using the template
    this.innerHTML = template;
  }
}

// Define the custom element
customElements.define("privacy-section", PrivacySection);
