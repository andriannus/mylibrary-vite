import PrevIcon from "./assets/icons/previous.png";

const textFieldKeys: Record<number, string> = {
  0: "title",
  1: "author",
  2: "year",
};

const payload: Record<string, string | boolean | number | null> = {
  title: "",
  author: "",
  year: null,
  isComplete: null,
};

export function bookAddMounted(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".ButtonGroup .Button",
  );
  const BUTTON_DEACTIVE_CLASS = "Button--outlined";

  if (buttons.length < 1) return;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      payload.isComplete = button.getAttribute("data-value");

      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].classList.add(BUTTON_DEACTIVE_CLASS);
      }

      buttons[index].classList.remove(BUTTON_DEACTIVE_CLASS);
      onFormChanges();
    });
  });

  const textFields = document.querySelectorAll<HTMLElement>("text-field");

  textFields.forEach((textField, key) => {
    textField.addEventListener("onChange", ((value: CustomEvent) => {
      payload[textFieldKeys[key]] = value.detail;
      onFormChanges();
    }) as EventListener);
  });

  const form = document.querySelector<HTMLFormElement>("#FrmAddBook");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(payload);
  });

  function onFormChanges(): void {
    const paylodValues = Object.values(payload);
    const isFormValid = paylodValues.every((value) => !!value);
    const submitButton = document.querySelector("#BtnSubmit");

    if (isFormValid) {
      submitButton?.removeAttribute("disabled");
    } else {
      submitButton?.setAttribute("disabled", "");
    }
  }
}

export const BookAdd = /*html*/ `
<header class="AppBar">
  <a
    aria-label="Back"
    href="/"
    class="AppBar-backButton"
    role="button"
  >
    <img src="${PrevIcon}" alt="Previous" />
  </a>
</header>

<main>
  <div class="Box">
    <div class="pb-sm px-sm mobile:pb-0 mobile:px-0">
      <div class="flex items-center justify-between mb-md">
        <p class="Heading">Tambah buku</p>
      </div>

      <form id="FrmAddBook">
        <text-field
          id="TxtBookTitle"
          class="mb-md"
          placeholder="Judul buku"
        ></text-field>

        <text-field
          id="TxtAuthor"
          class="mb-md"
          placeholder="Penulis"
        ></text-field>

        <text-field
          id="TxtYearOfPublication"
          class="mb-md"
          type="number"
          placeholder="Tahun terbit"
        ></text-field>

        <div class="ButtonGroup mb-md" role="group">
          <button
            data-value="0"
            class="Button Button--success Button--outlined Button--fullWidth"
            type="button"
          >
            Sedang dibaca
          </button>

          <button
            data-value="1"
            class="Button Button--success Button--outlined Button--fullWidth"
            type="button"
          >
            Selesai dibaca
          </button>
        </div>
        
        <button
          id="BtnSubmit"
          class="Button Button--fullWidth Button--primary"
          disabled
          type="submit"
        >
          Simpan
        </button>
      </form>
    </div>
  </div>
</main>
`;
