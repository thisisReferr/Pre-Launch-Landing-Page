class FooterIcons extends HTMLElement {
    connectedCallback() {
        // Retrieve the icons data from an attribute
        let iconsData = JSON.parse(this.getAttribute('icons'));
        if (!iconsData) {
            iconsData = [
                {
                    alt: "linkedin",
                    src: "./public/linkedin.svg"
                },
                {
                    alt: "instagram",
                    src: "./public/instagram.svg"
                }
            ];
        }

        // Generate the markup for the icons
        const iconsMarkup = iconsData
            .map(icon => `<a href="#"><img alt="${icon.alt}" src="${icon.src}" /></a>`)
            .join('');

        // Set the innerHTML of the component
        this.innerHTML = `
            <div class="footer_right">
                ${iconsMarkup}
            </div>
        `;
    }
}

// Define the custom element
customElements.define('footer-icons', FooterIcons);
