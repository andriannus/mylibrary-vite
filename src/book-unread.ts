import PrevIcon from "./assets/icons/previous.png";
import { DeleteBookDialog, SuccessToast } from "./components/swal";
import { IBook } from "./models/book.model";
import {
  deleteBook,
  getBooks,
  searchBook,
  setBookAsAlreadyRead,
} from "./stores/book";
import { debounce } from "./utils/debounce";

export function bookUnreadMounted(): void {
  document.title = "Daftar Buku Belum Selesai Dibaca | myLibrary";
  handleUnreadBooksContent();

  const searchField = document.querySelector("search-field") as HTMLElement;

  searchField.addEventListener("onChange", handleSearchChanges);
}

const handleSearchChanges = debounce((value: CustomEvent<string>) => {
  const searchedBooks = searchBook(value.detail);
  handleUnreadBooksContent(searchedBooks);
}, 200);

function handleAlreadyReadBookButton(): void {
  const alreadyReadButtons = document.querySelectorAll<HTMLButtonElement>(
    "[id*='BtnSetAsAlreadyRead']",
  );

  alreadyReadButtons.forEach((alreadyReadButton) => {
    alreadyReadButton.addEventListener("click", () => {
      setBookAsAlreadyRead(
        alreadyReadButton.getAttribute("data-book-id") as string,
      );

      handleUnreadBooksContent();
      SuccessToast("Buku selesai dibaca");
    });
  });
}

function handleDeleteBookButton(): void {
  const deleteButtons =
    document.querySelectorAll<HTMLButtonElement>("[id*='BtnDelete']");

  deleteButtons.forEach((alreadyReadButton) => {
    alreadyReadButton.addEventListener("click", async () => {
      const result = await DeleteBookDialog();

      if (result.isConfirmed) {
        deleteBook(alreadyReadButton.getAttribute("data-book-id") as string);
        handleUnreadBooksContent();
        SuccessToast("Buku berhasil dihapus");
      }
    });
  });
}

function handleUnreadBooksContent(searchedBooks?: IBook[]): void {
  const container = document.querySelector("#DpyUnreadBooks") as HTMLDivElement;

  const books = searchedBooks ?? getBooks();
  const unreadBooks = books.filter((book) => !book.isComplete);

  if (unreadBooks.length < 1) {
    container.innerHTML = `
      <p class="text-xs text-center">Tidak ada data</p>
    `;
  } else {
    container.innerHTML = `
      <ul class="List">
        ${unreadBooks
          .map((unreadBook, index) => {
            return `
            <li class="List-item">
              <div class="List-itemContent">
                <p class="List-itemTitle">${unreadBook.title}</p>

                <span class="List-itemSubtitle">
                  ${unreadBook.author}, ${unreadBook.year}
                </span>
              </div>

              <div class="List-actions">
                <button
                  id="BtnSetAsAlreadyRead${index}"
                  class="List-action List-action--success"
                  type="button"
                  data-book-id="${unreadBook.id}"
                >
                  Selesai dibaca
                </button>

                <button 
                  id="BtnDelete${index}"
                  class="List-action"
                  type="button"
                  data-book-id="${unreadBook.id}"
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

    handleAlreadyReadBookButton();
    handleDeleteBookButton();
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

  <div class="Box">
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
