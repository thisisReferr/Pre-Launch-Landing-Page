const routes = {
  "/": () => import("./../web-components/hero-component/hero-section.js"),
  "/privacy": () =>
    import("./../web-components/privacy-component/privacy-section.js"),
  "/tc": () =>
    import(
      "./../web-components/terms-and-conditions-component/terms-and-conditions-section.js"
    ),
};

function loadComponent() {
  const hash = window.location.hash.slice(1); // remove the '#' at the beginning
  const loadModule = routes[hash];

  if (!loadModule) {
    console.error("Component not found for route:", hash);
    return;
  }

  loadModule().then(() => {
    const injectionSection = document.getElementById("inject-template");
    // After the component is loaded, you can use it
    const componentName = componentNameFromHash(hash);
    injectionSection.innerHTML = `<${componentName}></${componentName}>`;
  });
}

window.addEventListener("hashchange", loadComponent);
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "/"; // default route
  }
  loadComponent();
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
