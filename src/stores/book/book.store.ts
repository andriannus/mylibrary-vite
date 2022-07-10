import { MLA_BOOKS } from "../../constants/global";
import { IBook } from "../../models/book.model";
import { useLocalStorage } from "../../utils/local-storage";

const ls = useLocalStorage();

function sortBooks(books: IBook[]): IBook[] {
  return books.sort((a, b) => b.createdAt - a.createdAt);
}

export function getBook(bookId: string): IBook | null {
  if (!ls.isExist(MLA_BOOKS)) return null;

  const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];
  const selectedBook = books.find((book) => book.id === bookId) ?? null;

  return selectedBook;
}

export function getBooks(): IBook[] {
  if (ls.isExist(MLA_BOOKS)) {
    const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];
    const sortedBooks = sortBooks(books);

    return sortedBooks;
  } else {
    return [];
  }
}

export function saveBook(book: IBook): void {
  if (ls.isExist(MLA_BOOKS)) {
    const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];

    books.push(book);
    ls.set(MLA_BOOKS, books);
  } else {
    ls.set(MLA_BOOKS, [book]);
  }
}

export function deleteBook(bookId: string): void {
  const books = getBooks();
  const selectedBookIdx = books.findIndex((book) => book.id === bookId);

  books.splice(selectedBookIdx, 1);
  ls.set(MLA_BOOKS, books);
}

export function searchBook(title: string): IBook[] {
  const books = getBooks();
  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase()),
  );
  const sortedBooks = sortBooks(searchedBooks);

  return sortedBooks;
}

export function setBookAsAlreadyRead(bookId: string): void {
  const books = getBooks();
  const selectedBookIdx = books.findIndex((book) => book.id === bookId);

  books[selectedBookIdx].isComplete = true;

  ls.set(MLA_BOOKS, books);
}

export function setBookAsUnread(bookId: string): void {
  const books = getBooks();
  const selectedBookIdx = books.findIndex((book) => book.id === bookId);

  books[selectedBookIdx].isComplete = false;

  ls.set(MLA_BOOKS, books);
}
