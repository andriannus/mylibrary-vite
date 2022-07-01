import PrevIcon from "./assets/icons/previous.png";

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
          placeholder="Tahun terbit"
        ></text-field>
      </form>
    </div>
  </div>
</main>
`;
