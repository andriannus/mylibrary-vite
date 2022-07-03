import scss from "./text-field.scss";

class TextField extends HTMLElement {
  private input: HTMLInputElement;
  private template: HTMLTemplateElement;

  private _value: string;

  private get placeholder(): string {
    return this.getAttribute("placeholder") ?? "";
  }

  private get type(): string {
    return this.getAttribute("type") ?? "text";
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

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));

    this.input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
  }

  connectedCallback(): void {
    this.input?.addEventListener("input", (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      this.value = value;
    });
  }
}

customElements.define("text-field", TextField);
