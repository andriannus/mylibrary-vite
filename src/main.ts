import { useRouter } from "./utils/router";

import "./components/search-field";
import "./components/text-field";
import "./style.scss";

const router = useRouter();

window.onpopstate = router.show;
window.onload = router.show;
