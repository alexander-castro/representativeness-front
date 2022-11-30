import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import "bulma/css/bulma.min.css";

import App from "./App.vue";
import { createI18n } from "vue-i18n";
import { messages } from "./i18n/translations.js";
import FileList from "./components/FileList.vue";
import NewFile from "./components/GeneralComponents/NewFile.vue";
import NotFound from "./components/GeneralComponents/NotFound.vue";
import MainReport from "./components/ComparativeReport.vue";
import RepresentativenessReport from "./components/RepresentativenessReport.vue";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "es",
  messages,
});

const routes = [
  { path: "/", component: FileList },
  {
    path: "/reportes/:nombre",
    name: "reportes",
    component: MainReport,
    props: (route: { params: { nombre: any }; query: { columnas: any; fuerza: any; muestreo: any } }) => ({
      nombre: route.params.nombre,
      columnas: route.query.columnas,
      fuerza: route.query.fuerza,
      muestreo: route.query.muestreo,
    }),
  },
  {
    path: "/reporte/:nombre",
    name: "reporte",
    component: RepresentativenessReport,
    props: (route: { params: { nombre: any }; query: { columnas: any; fuerza: any } }) => ({
      name: route.params.nombre,
      force: route.query.fuerza,
      type: "original",
    }),
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
app.use(i18n);
app.use(VueAxios, axios);
app.mount("#app");
