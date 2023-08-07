class FooterLinks extends HTMLElement {
  connectedCallback() {
    // Retrieve the links data from an attribute
    let linksData = JSON.parse(this.getAttribute("links"));
    if (!linksData) {
      linksData = [
        {
          name: "Terms & Conditions",
          link: "/tc",
        },
        {
          name: "Privacy",
          link: "/privacy",
        },
      ];
    }

    // Generate the markup for the links
    const linksMarkup = linksData
      .map((link) => `<a href="${link.link}"><p>${link.name}</p></a>`)
      .join("");

    // Set the innerHTML of the component
    this.innerHTML = `
        <div class="footer_left">
          ${linksMarkup}
        </div>
      `;
  }
}

// Define the custom element
customElements.define("footer-links", FooterLinks);
