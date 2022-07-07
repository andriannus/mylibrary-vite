import { IBook } from "./models/book.model";
import { getBooks } from "./stores/book";
import { greet } from "./utils/date";
import { capitalizeFirstLetter } from "./utils/transform";

enum BookType {
  Unread = "unread",
  AlreadRead = "already-read",
}

export function homeMounted(): void {
  const books = getBooks();
  const alreadyReadBooks = books.filter((book) => book.isComplete);
  const unreadBooks = books.filter((book) => !book.isComplete);

  renderBooks(BookType.AlreadRead, alreadyReadBooks);
  renderBooks(BookType.Unread, unreadBooks);
}

function renderBooks(type: BookType, books: IBook[]): void {
  const containerID =
    type === BookType.Unread ? "#DpyUnreadBooks" : "#DpyAlreadyReadBooks";

  const container = document.querySelector(containerID) as HTMLDivElement;

  const heading = /*html*/ `
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">${
        type === BookType.Unread ? "Belum selesai dibaca" : "Selesai dibaca"
      }</p>

      <a class="Link" href="/${type}">Lihat lebih banyak</a>
    </div>
  `;

  if (books.length < 1) {
    container.outerHTML = `
      ${heading}
      <p class="text-xs text-center">Tidak ada data</p>
    `;
  } else {
    container.outerHTML = `
      ${heading}
      <ul class="List">
        ${books
          .filter((_book, index) => index < 5)
          .map((book) => {
            return `
              <li class="List-item">
                <div class="List-itemContent">
                  <p class="List-itemTitle">${book.title}</p>

                  <span class="List-itemSubtitle">
                    ${book.author}, ${book.year}
                  </span>
                </div>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  }
}

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
    <div id="DpyUnreadBooks"></div>
  </div>

  <div class="Box">
    <div id="DpyAlreadyReadBooks"></div>
  </div>
</main>
`;
