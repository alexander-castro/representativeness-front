<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  props: { nombre: String, fuerza: String },
  components: { Bar },
  data() {
    return {
      API: this.$API,
      colors: ["#0085c3", "#7ab800", "#f2af00", "#dc5034", "#ce1126", "#b7295a", "#6e2585"],
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
      countAverage: 0,
      chartData: [],
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
    remove_quotes(row: String) {
      return row.toString().replace('"', "");
    },
    calculate_rgba_opacity(index: number, size: number) {
      const opacity = 1 - (1 / (size + 4)) * index;
      return `rgba(97, 179, 222, ${opacity})`;
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
.p-matrix-numbers {
  color: white;
  text-align: center !important;
}
.red-value {
  background-color: #ff3c41;
}

.yellow-value {
  background-color: #fcd000;
}

.green-value {
  background-color: #47cf73;
}
</style>

<template>
  <h1 class="title">Dataset: {{ nombre }} - {{ fuerza }}</h1>
  <div class="block">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">Datos originales:</h2>
        <table class="table">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column"
              :class="{ 'is-selected': index == columns.length - 1 }">
              {{ column }}
            </th>
          </tr>
          <tr v-for="item in data" :key="item">
            <td
              v-for="(element, j) in item"
              :key="element"
              :class="{ 'is-selected': j == Object.keys(item).length - 1 }">
              {{ element }}
            </td>
          </tr>
        </table>
      </div>
      <div class="column" v-if="isValidData">
        <h2 class="subtitle">Datos en categorias binarias:</h2>
        <table class="table">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column"
              :class="{ 'is-selected': index == columns.length - 1 }">
              {{ column }}
            </th>
          </tr>
          <tr v-for="item in binaryData" :key="item">
            <td
              v-for="(element, j) in item"
              :key="element"
              :class="{ 'is-selected': j == Object.keys(item).length - 1 }">
              {{ element }}
            </td>
          </tr>
        </table>
      </div>
      <div class="column" v-if="isValidData">
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
  </div>
  <div class="block">
    <h2 class="subtitle">Matriz P:</h2>
    <table class="table is-bordered">
      <tr>
        <th>Fila\Columna</th>
        <th v-for="column in matrixPColumns" :key="column">{{ column }}</th>
      </tr>
      <tr v-for="(row, index) in matrixPRows" :key="row">
        <td>{{ remove_quotes(row) }}</td>
        <td
          v-for="row_matrix in matrixP[index]"
          :key="row_matrix"
          :class="{
            'red-value': row_matrix < countAverage,
            'yellow-value': row_matrix == countAverage,
            'green-value': row_matrix > countAverage,
          }"
          class="p-matrix-numbers"
        >
          {{ row_matrix }}
        </td>
      </tr>
    </table>
    <h2 class="subtitle">Combinaciones:</h2>
    <table class="table is-bordered is-striped">
      <tr>
        <th>Top</th>
        <th>Combinación</th>
        <th>Valores</th>
        <th>Apariciones</th>
        <th>Porcentaje</th>
        <th>Porcentaje normalizado</th>
      </tr>
      <tr
        v-for="(row, index) in list"
        :key="row"
        v-bind:style="{ background: calculate_rgba_opacity(index, list.length) }"
      >
        <td>{{ index + 1 }}</td>
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
    <h2 class="subtitle">Reportes por fuerza: {{ fuerza }}</h2>
    <div class="columns" v-if="chartData.length > 0">
      <div class="column" v-for="data in chartData" :key="data">
        <Bar :chart-data="data" class="graph" />
      </div>
    </div>
  </div>
  <div class="notification is-danger" v-if="!isValidData">
    Las siguientes columnas del conjunto de datos cargado no son binarias:
    <ul v-for="invalid_column in invalidColumns" :key="invalid_column">
      <li>{{ invalid_column }}</li>
    </ul>
  </div>
  <router-link to="/" class="button is-link is-light">Volver</router-link>
</template>
