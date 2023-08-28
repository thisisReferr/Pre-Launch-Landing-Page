import { privacyPoints } from "./privacy-points.js";
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

    // Handle dynamic content
    this.renderPrivacyPoints();
  }

  renderPrivacyPoints() {
    const points = privacyPoints;
    const container = this.shadowRoot.querySelector(".privacy_point_container");
    points.forEach((point) => {
      const div = document.createElement("div");
      div.classList.add("privacy_point");

      let itemsList = "";
      if (point.items.length > 0) {
        itemsList = `
                <ul>
                    ${point.items
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            `;
      }

      const formattedDescription = point.description.replace(/\n/g, "<br>");

      div.innerHTML = `
            <div><h1>${point.title}</h1></div>
            <div class="privacy_point_content">
                <p>${formattedDescription}</p>
                ${itemsList}
            </div>
        `;
      container.appendChild(div);
    });
  }
}

// Define the custom element
customElements.define("privacy-section", PrivacySection);
