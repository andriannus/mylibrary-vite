import { BookAdd, bookAddMounted } from "./book-add";
import { BookAlreadyRead, bookAlreadyReadMounted } from "./book-already-read";
import { BookUnread, bookUnreadMounted } from "./book-unread";
import { Home, homeMounted } from "./home";

type Routes = Record<
  string,
  {
    component: string;
    onMount?: () => void;
  }
>;

export const routes: Routes = {
  "/": {
    component: Home,
    onMount: homeMounted,
  },
  "/add": {
    component: BookAdd,
    onMount: bookAddMounted,
  },
  "/already-read": {
    component: BookAlreadyRead,
    onMount: bookAlreadyReadMounted,
  },
  "/unread": {
    component: BookUnread,
    onMount: bookUnreadMounted,
  },
};
