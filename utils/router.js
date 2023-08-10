const routes = {
  "/": () => import("./../web-components/hero-component/hero-section.js"),
  "/privacy": () =>
    import("./../web-components/privacy-component/privacy-section.js"),
  "/tc": () =>
    import(
      "./../web-components/terms-and-conditions-component/terms-and-conditions-section.js"
    ),
  "/404": () => import("./../web-components/404-component/404-section.js"),
};

function loadComponent() {
  const hash = window.location.hash.slice(1);
  let loadModule = routes[hash];

  if (!loadModule) {
    console.error("Component not found for route:", hash);
    loadModule = routes["/404"]; // default to 404 component
  }

  loadModule().then(() => {
    const injectionSection = document.getElementById("inject-template");
    const componentName =
      (hash && componentNameFromHash(hash)) || "not-found-section";
    injectionSection.innerHTML = `<${componentName}></${componentName}>`;
  });
}

window.addEventListener("hashchange", loadComponent);
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "/"; // default route
  }
});

function componentNameFromHash(hash) {
  switch (hash) {
    case "/":
      return "hero-section";
    case "/privacy":
      return "privacy-section";
    case "/tc":
      return "tc-section";
    default:
      return "";
  }
}
