import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "bulma/css/bulma.min.css";

import FileList from "./components/FileList.vue";
import NewFile from "./components/NewFile.vue";
import FileReport from "./components/FileReport.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  { path: "/", component: FileList },
  {
    path: "/reportes/:nombre",
    name: "reportes",
    component: FileReport,
    props: true,
  },
  { path: "/nuevo", component: NewFile },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.config.globalProperties.$API = "http://127.0.0.1:5000/";
app.use(router);
app.mount("#app");
