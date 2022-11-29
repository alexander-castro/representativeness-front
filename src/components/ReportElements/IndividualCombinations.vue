<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    list: {
      type: Array<Array<string>>,
      required: true,
    },
  },
  methods: {
    calculate_rgba_opacity(index: number, size: number) {
      const opacity = 1 - (1 / (size + 4)) * index;
      return `rgba(97, 179, 222, ${opacity})`;
    },
  },
});
</script>

<template>
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
      :key="index"
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
</template>
