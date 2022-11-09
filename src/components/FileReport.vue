<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  props: { nombre: String, fuerza: Number },
  components: { Bar },
  data() {
    return {
      API: this.$API,
      columns: [],
      data: {},
      isValidData: true,
      invalidColumns: [],
      binaryData: {},
      binaryCategories: [],
      matrixPColumns: [],
      matrixPRows: [],
      matrixP: [],
      list: [],
      representativenessAverge: 0.0,
      totalCount: 0,
      graph: { name: "" },
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12],
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = `${this.API}files/${this.nombre}?force=${this.fuerza}`;
      const data = await (await fetch(url)).json();
      this.columns = data.columns;
      this.data = data.data;
      this.isValidData = data.isValidData;
      this.invalidColumns = data.invalidColumns;
      this.binaryData = data.binaryData;
      this.binaryCategories = data.binaryCategories;
      this.matrixPColumns = data.matrixPColumns;
      this.matrixPRows = data.matrixPRows;
      this.matrixP = data.matrixP;
      this.list = data.list;
      const representativenessTotal = this.list.reduce((accumulator, currentValue) => accumulator + currentValue[4], 0);
      this.totalCount = this.list.reduce((accumulator, currentValue) => accumulator + currentValue[2], 0);
      this.representativenessAverge = representativenessTotal / this.list.length;
      this.graph = data.graph;
    },
  },
});
</script>

<template>
  <h1 class="title">Dataset: {{ nombre }} - {{ fuerza }}</h1>
  <div class="block">
    <h2 class="subtitle">Datos originales:</h2>
    <table class="table">
      <tr>
        <th v-for="(column, index) in columns" :key="column" :class="{ 'is-selected': index == columns.length - 1 }">
          {{ column }}
        </th>
      </tr>
      <tr v-for="item in data" :key="item">
        <td v-for="(element, j) in item" :key="element" :class="{ 'is-selected': j == Object.keys(item).length - 1 }">
          {{ element }}
        </td>
      </tr>
    </table>
  </div>
  <div class="block" v-if="isValidData">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">Datos convertidos a categorias binarias:</h2>
        <table class="table">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column"
              :class="{ 'is-selected': index == columns.length - 1 }"
            >
              {{ column }}
            </th>
          </tr>
          <tr v-for="item in binaryData" :key="item">
            <td
              v-for="(element, j) in item"
              :key="element"
              :class="{ 'is-selected': j == Object.keys(item).length - 1 }"
            >
              {{ element }}
            </td>
          </tr>
        </table>
      </div>
      <div class="column">
        <h2 class="subtitle">Categorias:</h2>
        <table class="table">
          <tr>
            <th>Categoria\Valor</th>
            <th>0</th>
            <th>1</th>
          </tr>
          <tr v-for="(value, key) in binaryCategories" :key="key">
            <td>{{ key }}</td>
            <td v-for="(_, categoryKey) in value" :key="categoryKey">
              {{ categoryKey }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <h2 class="subtitle">Matriz P:</h2>
    <table class="table">
      <tr>
        <th>Fila\Columna</th>
        <th v-for="column in matrixPColumns" :key="column">{{ column }}</th>
      </tr>
      <tr v-for="(row, index) in matrixPRows" :key="row">
        <td>{{ row }}</td>
        <td v-for="row_matrix in matrixP[index]" :key="row_matrix">
          {{ row_matrix }}
        </td>
      </tr>
    </table>
    <h2 class="subtitle">Combinaciones:</h2>
    <table class="table is-bordered is-striped">
      <tr>
        <th>Combinación</th>
        <th>Valores</th>
        <th>Apariciones</th>
        <th>Porcentaje</th>
        <th>Porcentaje normalizado</th>
      </tr>
      <tr v-for="row in list" :key="row">
        <td>{{ row[0] }}</td>
        <td>{{ row[1] }}</td>
        <td>{{ row[2] }}</td>
        <td>{{ row[3] }}%</td>
        <td>{{ row[4] }}%</td>
      </tr>
    </table>
    <h4 class="title is-4">
      Porcentaje promedio de representatividad:
      {{ representativenessAverge.toFixed(2) }} %
    </h4>
    <progress class="progress is-success" v-bind:value="representativenessAverge" max="100">
      {{ representativenessAverge.toFixed(2) }}%
    </progress>
    <h2 class="subtitle">
      {{ graph.name }}
    </h2>
    <Bar :chart-data="chartData" />
  </div>
  <div class="notification is-danger" v-else>
    Las siguientes columnas del conjunto de datos cargado no son binarias:
    <ul v-for="invalid_column in invalidColumns" :key="invalid_column">
      <li>{{ invalid_column }}</li>
    </ul>
  </div>
  <router-link to="/" class="button is-link is-light">Volver</router-link>
</template>
