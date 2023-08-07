class HeroSection extends HTMLElement {
  async connectedCallback() {
    // Fetch the external HTML template
    const response = await fetch(
      "./web-components/hero-component/hero-template.html",
    );
    const template = await response.text();

    // Set the innerHTML of the component using the template
    this.innerHTML = template;
    // Append the script
    const scriptEl = document.createElement("script");
    scriptEl.type = "module";
    scriptEl.src = "./../index.js";
    this.appendChild(scriptEl);
  }
}

// Define the custom element
customElements.define("hero-section", HeroSection);
