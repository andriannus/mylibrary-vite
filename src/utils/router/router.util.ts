import { routes } from "../../routes";
import { RouterHook } from "./router.model";

export function useRouter(): RouterHook {
  function getUrl(path: string): string {
    return window.location.origin + path;
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

          const isBackButton = selector === ".AppBar-backButton";

          isBackButton ? replace(href) : push(href);
          show();
        });
      });
    });
  }

  function show(): void {
    const app = document.querySelector("#app") as HTMLDivElement;
    const { component, onMount } = routes[window.location.pathname];

    app.innerHTML = `
      <div class="DefaultLayout">${component}</div>
    `;

    onMount && onMount();
    handleAnchorElements();
  }

  function push(path: string): void {
    window.history.pushState({}, path, getUrl(path));
    show();
  }

  function replace(path: string): void {
    window.history.replaceState({}, path, getUrl(path));
    show();
  }

  return { push, show, replace };
}
