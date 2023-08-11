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
    window.location.replace(window.location.origin + "/#/404"); // redirect to 404 page
    return;
  }

  loadModule().then(() => {
    const injectionSection = document.getElementById("inject-template");
    const componentName = componentNameFromHash(hash);
    injectionSection.innerHTML = `<${componentName}></${componentName}>`;
  });
}

window.addEventListener("hashchange", loadComponent);
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname !== "/") {
    window.location.replace(window.location.origin + "/#/404");
    loadComponent();
    return;
  }

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
      return "not-found-section";
  }
}
