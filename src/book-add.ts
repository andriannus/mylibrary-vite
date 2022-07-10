import { nanoid } from "nanoid";

import PrevIcon from "./assets/icons/previous.png";
import { SuccessToast } from "./components/swal";
import { IBook } from "./models/book.model";
import { saveBook } from "./stores/book";
import { getBackRoute, removeBackRouteIfExist } from "./stores/router";
import { useRouter } from "./utils/router";

interface State {
  author: string;
  isComplete: string | null;
  title: string;
  year: string | null;
}

const router = useRouter();

const textFieldKeys: Record<number, keyof State> = {
  0: "title",
  1: "author",
  2: "year",
};

const state: State = {
  title: "",
  author: "",
  year: null,
  isComplete: null,
};

export function bookAddMounted(): void {
  document.title = "Tambah Buku | myLibrary";

  const backButton = document.querySelector(
    ".AppBar-backButton",
  ) as HTMLAnchorElement;

  backButton.href = getBackRoute();

  removeBackRouteIfExist();

  const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".ButtonGroup .Button",
  );
  const BUTTON_DEACTIVE_CLASS = "Button--outlined";

  if (buttons.length < 1) return;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      state.isComplete = button.getAttribute("data-value");

      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].classList.add(BUTTON_DEACTIVE_CLASS);
      }

      buttons[index].classList.remove(BUTTON_DEACTIVE_CLASS);
      handleFormChanges();
    });
  });

  const textFields = document.querySelectorAll<HTMLElement>("text-field");

  textFields.forEach((textField, key) => {
    textField.addEventListener("onChange", ((value: CustomEvent<string>) => {
      state[textFieldKeys[key]] = value.detail;
      handleFormChanges();
    }) as EventListener);
  });

  const form = document.querySelector("#FrmAddBook") as HTMLFormElement;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit();
  });

  function handleFormChanges(): void {
    const paylodValues: (string | null)[] = Object.values(state);
    const isFormValid = paylodValues.every((value) => !!value);
    const submitButton = document.querySelector("#BtnSubmit");

    if (isFormValid) {
      submitButton?.removeAttribute("disabled");
    } else {
      submitButton?.setAttribute("disabled", "");
    }
  }

  function handleSubmit(): void {
    const createdAt = new Date().getTime();
    const isComplete = (state.isComplete as string) === "1";

    const book: IBook = {
      ...state,
      createdAt,
      isComplete,
      id: nanoid(10),
      year: parseInt(state.year as string),
    };

    saveBook(book);
    SuccessToast("Buku berhasil ditambah");

    const nextPath = isComplete ? "/already-read" : "/unread";
    router.push(nextPath);
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
            id="BtnIsBeingRead"
            data-value="0"
            class="Button Button--success Button--outlined Button--fullWidth"
            type="button"
          >
            Sedang dibaca
          </button>

          <button
            id="BtnAlreadyRead"
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
