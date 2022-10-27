<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  props: { nombre: String },
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
      const url = `${this.API}files/${this.nombre}`;
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
      this.graph = data.graph;
    },
  },
});
</script>

<template>
  <h1 class="title">Dataset: {{ nombre }}</h1>
  <div class="block">
    <h2 class="subtitle">Datos originales:</h2>
    <table class="table">
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
      <tr v-for="item in data" :key="item">
        <td>{{ item[0] }}</td>
        <td>{{ item[1] }}</td>
        <td>{{ item[2] }}</td>
      </tr>
    </table>
  </div>
  <div class="block" v-if="isValidData">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">Datos convertidos a categorias binarias:</h2>
        <table class="table">
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </tr>
          <tr v-for="item in binaryData" :key="item">
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
            <td>{{ item[2] }}</td>
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
