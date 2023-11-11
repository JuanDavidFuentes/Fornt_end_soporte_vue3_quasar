import App from "./App.vue";
import { createApp } from "vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

axios.defaults.baseURL = "http://localhost:4000/api";

const pinia = createPinia();
const app = createApp(App).use(Quasar, quasarUserOptions);

app.use(router);
app.use(pinia);
app.use(VueSweetalert2);

app.mount("#app");
