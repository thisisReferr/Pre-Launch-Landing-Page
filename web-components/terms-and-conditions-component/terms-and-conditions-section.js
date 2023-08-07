class TCSection extends HTMLElement {
  async connectedCallback() {
    // Fetch the external HTML template
    const response = await fetch(
      "./web-components/terms-and-conditions-component/terms-and-condition-template.html",
    );
    const template = await response.text();

    // Set the innerHTML of the component using the template
    this.innerHTML = template;
  }
}

// Define the custom element
customElements.define("tc-section", TCSection);
