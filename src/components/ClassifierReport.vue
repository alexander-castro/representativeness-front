<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    x_test: {
      type: Array,
      default: () => [],
    },
    y_pred: {
      type: Array,
      default: () => [],
    },
    y_test: {
      type: Array,
      default: () => [],
    },
    score: {
      type: Number,
      default: 0,
    },
    binaryCategories: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      API: this.$API,
    };
  },
  methods: {
    translate(column: any, element: number) {
      const object = this.$props.binaryCategories[column];
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
