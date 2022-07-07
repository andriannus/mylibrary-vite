import { MLA_BACK_ROUTE } from "../../constants/global";
import { useLocalStorage } from "../../utils/local-storage";

const ls = useLocalStorage();

export function getBackRoute(): string {
  if (ls.isExist(MLA_BACK_ROUTE)) {
    return ls.get(MLA_BACK_ROUTE) as string;
  }

  return "/";
}

export function setBackRoute(path: string): void {
  ls.set(MLA_BACK_ROUTE, path);
}

export function removeBackRouteIfExist(): void {
  if (ls.isExist(MLA_BACK_ROUTE)) {
    ls.remove(MLA_BACK_ROUTE);
  }
}
