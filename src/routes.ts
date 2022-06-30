import { BookAdd } from "./book-add";
import { BookAlreadyRead } from "./book-already-read";
import { BookUnread } from "./book-unread";
import { Home } from "./home";

type Routes = Record<string, string>;

export const routes: Routes = {
  "/": Home,
  "/add": BookAdd,
  "/already-read": BookAlreadyRead,
  "/unread": BookUnread,
};
