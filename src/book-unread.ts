import PrevIcon from "./assets/icons/previous.png";
import { getBooks } from "./stores/book";

export function bookUnreadMounted(): void {
  const container = document.querySelector("#DpyUnreadBooks") as HTMLDivElement;

  const books = getBooks();
  const unreadBooks = books.filter((book) => !book.isComplete);

  if (unreadBooks.length < 1) {
    container.outerHTML = `
      <p class="text-xs text-center">Tidak ada data</p>
    `;
  } else {
    container.outerHTML = `
      <ul class="List">
        ${unreadBooks
          .map((unreadBook) => {
            return `
            <li class="List-item">
              <div class="List-itemContent">
                <p class="List-itemTitle">${unreadBook.title}</p>

                <span class="List-itemSubtitle">
                  ${unreadBook.author}, ${unreadBook.year}
                </span>
              </div>

              <div class="List-actions">
                <button class="List-action List-action--success" type="button">
                  Selesai dibaca
                </button>

                <button class="List-action" type="button">
                  Hapus buku
                </button>
              </div>
            </li>
          `;
          })
          .join("")}
      </ul>
    `;
  }
}

export const BookUnread = /*html*/ `
<header class="AppBar mb-md">
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

  <div class="Box mb-md">
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">Menampilkan buku</p>

      <a class="Link" href="/add" data-back-route="/unread">
        Tambah buku
      </a>
    </div>
    
    <div id="DpyUnreadBooks"></div>
  </div>
</main>
`;
