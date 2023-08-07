class FooterIcons extends HTMLElement {
  connectedCallback() {
    // Retrieve the icons data from an attribute
    let iconsData = JSON.parse(this.getAttribute("icons"));

    //retrive path
    let path_extension = this.getAttribute("path") || "./public";

    if (!iconsData) {
      iconsData = [
        {
          alt: "linkedin",
          src: `${path_extension}/linkedin.svg`,
        },
        {
          alt: "email",
          src: `${path_extension}/email.svg`,
        },
      ];
    }

    // Generate the markup for the icons
    const iconsMarkup = iconsData
      .map(
        (icon) =>
          `<a href="#"><img width="25px" height="25px" alt="${icon.alt}" src="${icon.src}" /></a>`,
      )
      .join("");

    // Set the innerHTML of the component
    this.innerHTML = `
            <div class="footer_right">
                ${iconsMarkup}
            </div>
        `;
  }
}

// Define the custom element
customElements.define("footer-icons", FooterIcons);
