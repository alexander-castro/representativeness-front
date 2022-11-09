<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { nombre: String },
  data() {
    return {
      API: this.$API,
      columns: [],
      binary_categories: {} as { [key: string]: any },
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
      const url = `${this.API}report/${this.nombre}`;
      const data = await (await fetch(url)).json();
      this.columns = data.columns;
      this.binary_categories = data.binary_categories;
      this.x_test = data.x_test;
      this.y_pred = data.y_pred;
      this.y_test = data.y_test;
      this.score = data.score;
    },
    translate(column: string, element: number) {
      const object = this.binary_categories[column];
      return Object.keys(object).find((key) => object[key] === element);
    },
  },
});
</script>
<template>
  <h3 class="title is-4">Predicciones con muestra al azar:</h3>
  <table class="table">
    <tr>
      <th v-for="column in columns" :key="column">
        {{ column }}
      </th>
      <th>Acerto</th>
    </tr>
    <tr v-for="(item, index) in x_test" :key="item">
      <td v-for="(element, col) in item" :key="element">
        {{ translate(columns[col], element) }}
      </td>
      <td>
        {{ translate(columns[columns.length - 1], y_pred[index]) }}
      </td>
      <td>
        {{ y_pred[index] == y_test[index][0] ? "SI" : "NO" }}
      </td>
    </tr>
  </table>
  <h4 class="title is-4">Accuracy : {{ score }}</h4>
</template>
