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

function loadComponent(hash = window.location.hash.slice(1)) {
  let loadModule = routes[hash];

  if (!loadModule) {
    console.error("Component not found for route:", hash);
    window.location.hash = "/404";
    loadComponent("/404");
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
  if (window.location.pathname !== "/" && window.location.pathname !== "") {
    window.location.hash = "/404";
    loadComponent("/404");
    return;
  }

  if (!window.location.hash) {
    window.location.hash = "/"; // default route
    loadComponent("/");
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
