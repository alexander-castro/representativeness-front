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
  <h2 class="subtitle">{{ $t("message.combinations") }}</h2>
  <table class="table is-bordered is-striped">
    <tr>
      <th>Top</th>
      <th>{{ $t("message.combination") }}</th>
      <th>{{ $t("message.values") }}</th>
      <th>{{ $t("message.count") }}</th>
      <th>{{ $t("message.percentage") }}</th>
      <th>{{ $t("message.normalizedPercentage") }}</th>
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
