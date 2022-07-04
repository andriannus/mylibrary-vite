import { MLA_BOOKS } from "../../constants/global";
import { IBook } from "../../models/book.model";
import { useLocalStorage } from "../../utils/local-storage";

const ls = useLocalStorage();

export function saveBook(book: IBook): void {
  if (ls.isExist(MLA_BOOKS)) {
    const books = ls.get<IBook[]>(MLA_BOOKS) as IBook[];

    books.push(book);
    ls.set(MLA_BOOKS, books);
  } else {
    ls.set(MLA_BOOKS, [book]);
  }
}
