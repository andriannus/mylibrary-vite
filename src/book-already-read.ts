import PrevIcon from "./assets/icons/previous.png";
import { deleteBook, getBooks, setBookAsUnread } from "./stores/book";

export function bookAlreadyReadMounted(): void {
  handleAlreadyReadBooksContent();
}

function handleUnreadBookButton(): void {
  const alreadyReadButtons = document.querySelectorAll<HTMLButtonElement>(
    "[id*='BtnSetAsUnread']",
  );

  alreadyReadButtons.forEach((alreadyReadButton) => {
    alreadyReadButton.addEventListener("click", () => {
      setBookAsUnread(alreadyReadButton.getAttribute("data-book-id") as string);
      handleAlreadyReadBooksContent();
    });
  });
}

function handleDeleteBookButton(): void {
  const deleteButtons =
    document.querySelectorAll<HTMLButtonElement>("[id*='BtnDelete']");

  deleteButtons.forEach((alreadyReadButton) => {
    alreadyReadButton.addEventListener("click", () => {
      deleteBook(alreadyReadButton.getAttribute("data-book-id") as string);
      handleAlreadyReadBooksContent();
    });
  });
}

function handleAlreadyReadBooksContent(): void {
  const container = document.querySelector(
    "#DpyAlreadyReadBooks",
  ) as HTMLDivElement;

  const books = getBooks();
  const alreadyReadBooks = books.filter((book) => book.isComplete);

  if (alreadyReadBooks.length < 1) {
    container.innerHTML = `
      <p class="text-xs text-center">Tidak ada data</p>
    `;
  } else {
    container.innerHTML = `
      <ul class="List">
        ${alreadyReadBooks
          .map((alreadyReadBook, index) => {
            return `
            <li class="List-item">
              <div class="List-itemContent">
                <p class="List-itemTitle">${alreadyReadBook.title}</p>

                <span class="List-itemSubtitle">
                  ${alreadyReadBook.author}, ${alreadyReadBook.year}
                </span>
              </div>

              <div class="List-actions">
                <button
                  id="BtnSetAsUnread${index}"
                  class="List-action List-action--success"
                  type="button"
                  data-book-id="${alreadyReadBook.id}"
                >
                  Belum selesai dibaca
                </button>

                <button
                  id="BtnDelete${index}"
                  class="List-action"
                  type="button"
                  data-book-id="${alreadyReadBook.id}"
                >
                  Hapus buku
                </button>
              </div>
            </li>
          `;
          })
          .join("")}
      </ul>
    `;

    handleUnreadBookButton();
    handleDeleteBookButton();
  }
}

export const BookAlreadyRead = /*html*/ `
<header class="AppBar mb-md">
  <a
    aria-label="Back"
    href="/"
    class="AppBar-backButton"
    role="button"
  >
    <img src="${PrevIcon}" alt="Previous" />
  </a>

  <span class="AppBar-title">Buku sudah dibaca</span>
</header>

<main>
  <div class="Box mb-md">
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">Cari buku</p>
    </div>

    <search-field placeholder="Masukkan nama buku"></search-field>
  </div>

  <div class="Box">
    <div class="flex items-center justify-between mb-bs">
      <p class="Heading">Menampilkan buku</p>
      
      <a class="Link" href="/add" data-back-route="/already-read">
        Tambah buku
      </a>
    </div>
    
    <div id="DpyAlreadyReadBooks"></div>
  </div>
</main>
`;
