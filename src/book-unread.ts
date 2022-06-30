import PrevIcon from "./assets/icons/previous.png";

export const BookUnread = /*html*/ `
<header class="AppBar">
  <a
    aria-label="Back"
    href="/"
    class="AppBar-backButton"
    role="button"
  >
    <img src="${PrevIcon}" alt="Previous" />
  </a>

  <span class="AppBar-title">Buku belum selesai dibaca</span>
</header>

<main>
  <div class="Box mb-md">
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">Cari buku</p>
    </div>

    <search-field placeholder="Masukkan nama buku"></search-field>
  </div>

  <div class="Box">
    <p class="text-xs text-center">Tidak ada data</p>
  </div>
</main>
`;
