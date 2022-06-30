import { greet } from "./utils/date";
import { capitalizeFirstLetter } from "./utils/transform";

export const Home = /*html*/ `
<header class="AppBar">
  <span class="AppBar-brand">myLibrary</span>
</header>

<main>
  <div class="Box mb-md">
    <div class="flex items-center justify-between">
      <h2 class="Heading">
        ${capitalizeFirstLetter(greet())}
      </h2>

      <a class="Link" href="/add">Tambah buku</a>
    </div>
  </div>

  <div class="Box mb-md">
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">Belum selesai dibaca</p>
      <a class="Link" href="/unread">Lihat lebih banyak</a>
    </div>

    <p class="text-xs text-center">Tidak ada data</p>
  </div>

  <div class="Box">
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">Selesai dibaca</p>
      <a class="Link" href="/already-read">Lihat lebih banyak</a>
    </div>

    <p class="text-xs text-center">Tidak ada data</p>
  </div>
</main>
`;
