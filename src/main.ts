import { routes } from "./routes";
import "./components/search-field";
import "./style.scss";

interface NavigateParams {
  event: Event;
  pathname: string;
  replace?: boolean;
}

function handleNavigate({
  event,
  pathname,
  replace = false,
}: NavigateParams): void {
  event.preventDefault();

  const url = window.location.origin + pathname;

  if (replace) {
    window.history.replaceState({}, pathname, url);
  } else {
    window.history.pushState({}, pathname, url);
  }

  showCurrentPage();
}

function handleAnchorElements(): void {
  const selectors = [".Link", ".AppBar-backButton"];

  selectors.forEach((selector) => {
    const anchorElements = document.querySelectorAll<HTMLAnchorElement>(
      `${selector}`,
    );

    if (!anchorElements.length) return;

    anchorElements.forEach((anchorElement) => {
      const href = anchorElement.getAttribute("href") ?? "/";

      anchorElement.addEventListener("click", (event: Event) => {
        event.preventDefault();

        handleNavigate({
          event,
          pathname: href,
          replace: selector === ".AppBar-backButton",
        });
      });
    });
  });
}

const app = document.querySelector<HTMLDivElement>("#app");

function showCurrentPage(): void {
  if (!app) return;

  app.innerHTML = `
    <div class="DefaultLayout">
      ${routes[window.location.pathname]}
    </div>
  `;

  handleAnchorElements();
}

window.onpopstate = showCurrentPage;
window.onload = showCurrentPage;
