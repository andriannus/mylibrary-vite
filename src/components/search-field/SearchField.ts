import scss from "./search-field.scss";
import SearchIcon from "../../assets/icons/search.png";

class SearchField extends HTMLElement {
  get placeholder() {
    return this.getAttribute("placeholder") ?? "Cari di sini...";
  }

  constructor() {
    super();

    const style = document.createElement("style");
    style.innerHTML = scss;

    const template = document.createElement("template");
    template.innerHTML = `
      <div class="Search">
        <img class="Search-icon" src="${SearchIcon}" alt="Previous" />

        <div class="Search-field">
          <input
            autoComplete="off"
            class="Search-input"
            placeholder="${this.placeholder}"
          />
        </div>
      </div>
    `;

    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("search-field", SearchField);
