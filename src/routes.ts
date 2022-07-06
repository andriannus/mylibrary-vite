import { BookAdd, bookAddMounted } from "./book-add";
import { BookAlreadyRead } from "./book-already-read";
import { BookUnread, bookUnreadMounted } from "./book-unread";
import { Home } from "./home";

type Routes = Record<
  string,
  {
    component: string;
    onMount?: () => void;
  }
>;

export const routes: Routes = {
  "/": { component: Home },
  "/add": {
    component: BookAdd,
    onMount: bookAddMounted,
  },
  "/already-read": { component: BookAlreadyRead },
  "/unread": {
    component: BookUnread,
    onMount: bookUnreadMounted,
  },
};
