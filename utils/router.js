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

function loadComponent(input = window.location.hash.slice(1)) {
  let hash;

  // Check if the input is a HashChangeEvent
  if (input instanceof Event) {
    hash = window.location.hash.slice(1);
  } else {
    hash = input;
  }

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

window.addEventListener("hashchange", loadComponent);

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  if (currentPath === "/" || currentPath === "") {
    if (!window.location.hash) {
      window.location.hash = "/";
      loadComponent("/");
    } else {
      loadComponent();
    }
  } else if (routes[currentPath]) {
    window.location.hash = currentPath;
    loadComponent(currentPath);
  } else {
    window.location.hash = "/404";
    loadComponent("/404");
  }
});
