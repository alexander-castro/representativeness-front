<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import PMatrix from "./ReportElements/PMatrix.vue";
import IndividualCombinations from "./ReportElements/IndividualCombinations.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  props: { name: String, force: String, type: String },
  components: { Bar, PMatrix, IndividualCombinations },
  data() {
    return {
      API: this.$API,
      colors: ["#0085c3", "#7ab800", "#f2af00", "#dc5034", "#ce1126", "#b7295a", "#6e2585"],
      matrixPColumns: [],
      matrixPRows: [],
      matrixP: [],
      list: [],
      representativenessAverge: 0.0,
      countAverage: 0,
      chartData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = `${this.API}files/${this.name}?type=${this.type}&force=${this.force}`;
      const data = await (await fetch(url)).json();
      this.matrixPColumns = data.matrixPColumns;
      this.matrixPRows = data.matrixPRows;
      this.matrixP = data.matrixP;
      this.list = data.list;
      this.representativenessAverge =
        this.list.reduce((accumulator, currentValue) => accumulator + currentValue[4], 0) / this.list.length;
      this.countAverage =
        this.list.reduce((accumulator, currentValue) => accumulator + currentValue[2], 0) / this.list.length;
      let graphs: Record<string, { labels: Array<string>; data: Array<Number> }> = {};
      for (let element of this.list) {
        if (element[0] in graphs) {
          graphs[element[0]].labels.push(element[1]);
          graphs[element[0]].data.push(element[2]);
        } else {
          graphs[element[0]] = { labels: [element[1]], data: [element[2]] };
        }
      }
      let i = 0;
      for (let graph in graphs) {
        this.chartData.push(this.generate_char(i++, graph, graphs[graph].labels, graphs[graph].data));
      }
    },
    generate_char(i: number, name: String, labels: Array<String>, data: Array<Number>) {
      return {
        labels: labels,
        datasets: [
          {
            label: name,
            backgroundColor: this.colors[i],
            data: data,
          },
        ],
      };
    },
  },
});
</script>

<style>
.graph {
  width: 300px;
  height: 300px;
}
</style>

<template>
  <h1 class="title">Dataset: {{ name }} - {{ force }}</h1>
  <div class="block">
    <PMatrix
      :matrixP="matrixP"
      :matrixPRows="matrixPRows"
      :matrixPColumns="matrixPColumns"
      :countAverage="countAverage"
    />
    <IndividualCombinations :list="list" />
    <h4 class="title is-4">
      Porcentaje promedio de representatividad:
      {{ representativenessAverge.toFixed(2) }} %
    </h4>
    <progress class="progress is-success" v-bind:value="representativenessAverge" max="100">
      {{ representativenessAverge.toFixed(2) }}%
    </progress>
    <h2 class="subtitle">Reportes por fuerza: {{ force }}</h2>
    <div class="columns" v-if="chartData.length > 0" style="overflow-x: scroll">
      <div class="column" v-for="data in chartData" :key="data">
        <Bar :chart-data="data" class="graph" />
      </div>
    </div>
  </div>
  <router-link to="/" class="button is-link is-light">Volver</router-link>
</template>
