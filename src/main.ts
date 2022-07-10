import { useRouter } from "./utils/router";

import "./assets/scss/style.scss";
import "./components/search-field";
import "./components/text-field";

const router = useRouter();

window.onpopstate = router.show;
window.onload = router.show;
