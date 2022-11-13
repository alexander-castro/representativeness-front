<script lang="ts">
import { defineComponent } from "vue";
import GeneralDataReport from "./GeneralDataReport.vue";
import ClassifierReport from "./ClassifierReport.vue";
import RepresentativenessReport from "./RepresentativenessReport.vue";

export default defineComponent({
  components: {
    GeneralDataReport,
    ClassifierReport,
    RepresentativenessReport,
  },
  props: { nombre: String, fuerza: String, columnas: Array },
  data() {
    return {
      API: this.$API,
      data: [],
      binaryData: [],
      columns: [],
      binaryCategories: {} as { [key: string]: any },
      x_test: [],
      y_pred: [],
      y_test: [],
      score: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = `${this.API}report/${this.nombre}/${this.columnas}`;
      const data = await (await fetch(url)).json();
      this.data = data.data;
      this.binaryData = data.binary_data;
      this.columns = data.columns;
      this.binaryCategories = data.binary_categories;
      this.x_test = data.x_test;
      this.y_pred = data.y_pred;
      this.y_test = data.y_test;
      this.score = data.score;
    },
    translate(column: string, element: number) {
      const object = this.binaryCategories[column];
      return Object.keys(object).find((key) => object[key] === element);
    },
  },
});
</script>
<template>
  <router-link to="/" class="button is-link is-light">Home</router-link>
  <GeneralDataReport
    :name="nombre"
    :force="fuerza"
    :columns="columns"
    :data="data"
    :binary-data="binaryData"
    :binary-categories="binaryCategories"
  />
  <div class="block">
    <div class="columns">
      <div class="column">
        <RepresentativenessReport :name="nombre" :force="fuerza" :type="'train'" />
      </div>
      <div class="column">
        <RepresentativenessReport :name="nombre" :force="fuerza" :type="'test'" />
      </div>
    </div>
  </div>
  <ClassifierReport
    :columns="columns"
    :binary-categories="binaryCategories"
    :x_test="x_test"
    :y_test="y_test"
    :y_pred="y_pred"
    :score="score"
  />
</template>
