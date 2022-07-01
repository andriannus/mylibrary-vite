import scss from "./text-field.scss";

class TextField extends HTMLElement {
  get placeholder() {
    return this.getAttribute("placeholder") ?? "";
  }

  get type() {
    return this.getAttribute("type") ?? "text";
  }

  constructor() {
    super();

    const style = document.createElement("style");
    style.innerHTML = scss;

    const template = document.createElement("template");
    template.innerHTML = `
      <div class=${this.className}>
        <input
          id="${this.id}"
          class="TextField-input"
          placeholder="${this.placeholder}"
          title="${this.placeholder}"
          type="${this.type}"
        />
      </div>
    `;

    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("text-field", TextField);
