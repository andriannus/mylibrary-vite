import scss from "./search-field.scss";
import SearchIcon from "../../assets/icons/search.png";

class SearchField extends HTMLElement {
  private input: HTMLInputElement;
  private template: HTMLTemplateElement;
  private _value: string;

  private get placeholder(): string {
    return this.getAttribute("placeholder") ?? "Cari di sini...";
  }

  private get value(): string {
    if (this.hasAttribute("value")) {
      return this.getAttribute("value") ?? "";
    } else {
      return this._value;
    }
  }

  private set value(value: string) {
    this._value = value;
    this.dispatchEvent(new CustomEvent("onChange", { detail: this._value }));
  }

  constructor() {
    super();

    const style = document.createElement("style");
    style.innerHTML = scss;

    this._value = "";

    this.template = document.createElement("template");
    this.template.innerHTML = `
      <div class="Search">
        <img class="Search-icon" src="${SearchIcon}" alt="Previous" />

        <div class="Search-field">
          <input
            id="TxtSearch"
            autoComplete="off"
            class="Search-input"
            placeholder="${this.placeholder}"
          />
        </div>
      </div>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));

    this.input = this.shadowRoot?.querySelector(
      "#TxtSearch",
    ) as HTMLInputElement;
  }

  connectedCallback(): void {
    this.input?.addEventListener("input", (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      this.value = value;
    });
  }
}

customElements.define("search-field", SearchField);
