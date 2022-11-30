<script lang="ts">
import { defineComponent } from "vue";
import GeneralDataReport from "./ReportElements/GeneralData.vue";
import ClassifierReport from "./ReportElements/ClassifierResumen.vue";
import RepresentativenessReport from "./RepresentativenessReport.vue";
import ComparativeCombinations from "./ReportElements/ComparativeCombinations.vue";

export default defineComponent({
  components: {
    GeneralDataReport,
    ClassifierReport,
    RepresentativenessReport,
    ComparativeCombinations,
  },
  props: { nombre: String, fuerza: String, columnas: Array, muestreo: String },
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
      const url = `${this.API}report/${this.nombre}/${this.columnas}?muestreo=${this.muestreo}`;
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
      <div class="column" style="max-width: 50%">
        <RepresentativenessReport :name="nombre" :force="fuerza" :type="'train'" />
      </div>
      <div class="column" style="max-width: 50%">
        <RepresentativenessReport :name="nombre" :force="fuerza" :type="'test'" />
      </div>
    </div>
  </div>
  <ComparativeCombinations />
  <div class="block" style="margin-top: 20px">
    <ClassifierReport
      :columns="columns"
      :binary-categories="binaryCategories"
      :x_test="x_test"
      :y_test="y_test"
      :y_pred="y_pred"
      :score="score"
    />
  </div>
</template>
