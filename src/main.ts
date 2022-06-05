import { greet } from "./utils/date";
import { capitalizeFirstLetter } from "./utils/transform";

import "./style.scss";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <div class="DefaultLayout">
      <header class="AppBar">
        <span class="AppBar-brand">myLibrary</span>
      </header>

      <main>
        <div class="Box">
          <h2 class="Heading">
            ${capitalizeFirstLetter(greet())}
          </h2>
        </div>
      </main>
    </div>
  `;
}
