class NotFoundSection extends HTMLElement {
  async connectedCallback() {
    const [htmlResponse, cssResponse] = await Promise.all([
      fetch("./web-components/404-component/404-template.html"),
      fetch("./styles/404-style.css"),
    ]);

    const html = await htmlResponse.text();
    const css = await cssResponse.text();

    // Set the innerHTML of the component using the template
    const style = document.createElement("style");
    style.textContent = css;

    // Shadow DOM encapsulation, to isolate styles
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("not-found-section", NotFoundSection);
