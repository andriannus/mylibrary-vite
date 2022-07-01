import PrevIcon from "./assets/icons/previous.png";

const BUTTON_DEACTIVE_CLASS = "Button--outlined";

const payload: Record<string, string | boolean | number | null> = {
  isComplete: null,
};

export function bookAddMounted(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".ButtonGroup .Button",
  );

  if (buttons.length < 1) return;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const value = parseInt(button.getAttribute("data-value") ?? "");
      payload.isComplete = value;

      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].classList.add(BUTTON_DEACTIVE_CLASS);
      }

      buttons[index].classList.remove(BUTTON_DEACTIVE_CLASS);
    });
  });
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

      <form>
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
          class="Button Button--fullWidth Button--primary"
          type="button"
        >
          Simpan
        </button>
      </form>
    </div>
  </div>
</main>
`;
