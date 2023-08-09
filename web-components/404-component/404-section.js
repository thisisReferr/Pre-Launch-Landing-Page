class NotFoundSection extends HTMLElement {
  async connectedCallback() {
    const response = await fetch(
      "./web-components/404-component/404-template.html",
    );
    const template = await response.text();

    // Set the innerHTML of the component using the template
    this.innerHTML = template;
  }
}

customElements.define("not-found-section", NotFoundSection);
