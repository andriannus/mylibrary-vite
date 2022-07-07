import { MLA_BOOKS } from "../../constants/global";
import { IBook } from "../../models/book.model";
import { useLocalStorage } from "../../utils/local-storage";

const ls = useLocalStorage();

export function getBook(bookId: string): IBook | null {
  if (!ls.isExist(MLA_BOOKS)) return null;

  const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];
  const selectedBook = books.find((book) => book.id === bookId) ?? null;

  return selectedBook;
}

export function getBooks(): IBook[] {
  if (ls.isExist(MLA_BOOKS)) {
    const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];
    return books.reverse();
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
  const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];
  const selectedBookIdx = books.findIndex((book) => book.id === bookId) ?? null;

  books.splice(selectedBookIdx, 1);
  ls.set(MLA_BOOKS, books);
}
