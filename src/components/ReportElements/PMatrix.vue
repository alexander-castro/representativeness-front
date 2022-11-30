<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    matrixPColumns: {
      type: Array<string>,
      required: true,
    },
    matrixPRows: {
      type: Array<string>,
      required: true,
    },
    matrixP: {
      type: Array<Array<number>>,
      required: true,
    },
    countAverage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    remove_quotes(row: String) {
      return row.toString().replace('"', "");
    },
  },
});
</script>

<style scoped>
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
  <h2 class="subtitle">{{ $t("message.pMatrix") }}</h2>
  <table class="table is-bordered">
    <tr>
      <th>{{ $t("message.rowColumn") }}</th>
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
</template>
