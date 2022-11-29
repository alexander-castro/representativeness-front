<script lang="ts" setup>
import { store } from "../../store/store.js";
</script>
<style>
.elements {
  color: white;
  text-align: center !important;
}
.red-value {
  background-color: #ff3c41 !important;
}
.yellow-value {
  background-color: #fcd000;
}
.green-value {
  background-color: #47cf73;
}
</style>
<template>
  <h2 class="subtitle">{{ $t("message.combinations") }}</h2>
  <table class="table is-bordered is-striped" v-if="store.getCombinateList().length > 0">
    <tr>
      <th rowspan="2">Top</th>
      <th rowspan="2">{{ $t("message.combination") }}</th>
      <th rowspan="2">{{ $t("message.values") }}</th>
      <th colspan="3" style="text-align: center">Test</th>
      <th colspan="3" style="text-align: center">Train</th>
    </tr>
    <tr>
      <th>{{ $t("message.count") }}</th>
      <th>{{ $t("message.percentage") }}</th>
      <th>{{ $t("message.normalizedPercentage") }}</th>
      <th>{{ $t("message.count") }}</th>
      <th>{{ $t("message.percentage") }}</th>
      <th>{{ $t("message.normalizedPercentage") }}</th>
    </tr>
    <tr
      v-for="(row, index) in store.getCombinateList()"
      :key="index"
      :class="{
        'red-value': row[5] == 0,
        'green-value': row[5] <= row[2],
        'yellow-value': row[5] > row[2],
      }"
      class="elements"
    >
      <td>{{ index + 1 }}</td>
      <td>{{ row[0] }}</td>
      <td>{{ row[1] }}</td>
      <td>{{ row[2] }}</td>
      <td>{{ row[3] }}%</td>
      <td>{{ row[4] }}%</td>
      <td>{{ row[5] }}</td>
      <td>{{ row[6] }}%</td>
      <td>{{ row[7] }}%</td>
    </tr>
  </table>
</template>
