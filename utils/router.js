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
  console.log("Current Path:", currentPath);
  console.log("Current Hash:", window.location.hash);

  if (currentPath === "/" || currentPath === "") {
    console.log("At root...");
    if (!window.location.hash) {
      console.log("No hash, setting default...");
      window.location.hash = "/";
      loadComponent("/");
    } else {
      loadComponent();
    }
  } else if (routes[currentPath]) {
    console.log("Known route. Setting hash...");
    window.location.hash = currentPath;
    loadComponent(currentPath);
  } else {
    console.log("Unknown route. Redirecting to 404...");
    window.location.hash = "/404";
    loadComponent("/404");
  }
});