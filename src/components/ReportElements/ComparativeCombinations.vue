<script lang="ts">
import { store } from "../../store/store.js";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      filterDifference: "",
      filterCombinations: "",
      filterValues: "",
      list: [],
      filterList: [],
      trainAverage: 0,
      testAverage: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.list = store.getCombinateList();
      this.filterList = this.list;
      this.trainAverage = store.trainAverage;
      this.testAverage = store.testAverage;
    }, 300);
  },
  methods: {
    filter() {
      this.filterList = this.list;
      if (this.filterDifference !== "") {
        this.filterList = this.filterList.filter((element) => element[5] - element[2] >= +this.filterDifference);
      }
      if (this.filterCombinations !== "") {
        this.filterList = this.filterList.filter((element) => element[0].includes(this.filterCombinations));
      }
      if (this.filterValues !== "") {
        this.filterList = this.filterList.filter((element) => element[1].includes(this.filterValues));
      }
    },
  },
});
</script>
<style scoped>
.elements {
  text-align: center !important;
}
.red-value {
  color: #ff3c41;
}
.yellow-value {
  color: #fcd000;
}
.green-value {
  color: #47cf73;
}
</style>
<template>
  <h2 class="subtitle">{{ $t("message.combinations") }}</h2>

  <div class="notification">
    <p><i class="bi bi-x-octagon-fill red-value"></i> The combination hasn't elements in the test data set.</p>
    <p>
      <i class="bi bi-exclamation-triangle-fill yellow-value"></i> The combination has less elements in the train
      dataset.
    </p>
    <p><i class="bi bi-clipboard-x yellow-value"></i> The combination count for train is less than the average.</p>
    <p><i class="bi bi-clipboard-minus yellow-value"></i> The combination count for test is less than the average.</p>
    <p><i class="bi bi-check-circle-fill green-value"></i> The combination hasn't problems.</p>
  </div>

  <div class="block columns is-vcentered">
    <div class="field column">
      <label class="label">Count difference</label>
      <div class="control">
        <input class="input" type="number" v-model="filterDifference" />
      </div>
    </div>
    <div class="field column">
      <label class="label">Combination</label>
      <div class="control">
        <input class="input" type="text" v-model="filterCombinations" />
      </div>
    </div>
    <div class="field column">
      <label class="label">Values</label>
      <div class="control">
        <input class="input" type="text" v-model="filterValues" />
      </div>
    </div>
    <div class="field column" style="text-align: center">
      <button class="button is-link is-medium" v-on:click="filter">Filter</button>
    </div>
  </div>
  <div>
    <table class="table is-bordered is-striped" style="width: -webkit-fill-available" v-if="filterList.length > 0">
      <tr>
        <th rowspan="2" style="vertical-align: middle">Top</th>
        <th rowspan="2" style="vertical-align: middle">{{ $t("message.combination") }}</th>
        <th rowspan="2" style="vertical-align: middle">{{ $t("message.values") }}</th>
        <th colspan="3" style="text-align: center">{{ $t("message.train") }}</th>
        <th colspan="3" style="text-align: center">{{ $t("message.test") }}</th>
        <th rowspan="2" style="vertical-align: middle">{{ $t("message.alerts") }}</th>
      </tr>
      <tr>
        <th>{{ $t("message.count") }}</th>
        <th>{{ $t("message.percentage") }}</th>
        <th>{{ $t("message.normalizedPercentage") }}</th>
        <th>{{ $t("message.count") }}</th>
        <th>{{ $t("message.percentage") }}</th>
        <th>{{ $t("message.normalizedPercentage") }}</th>
      </tr>
      <tr v-for="(row, index) in filterList" :key="index" class="elements">
        <td>{{ index + 1 }}</td>
        <td>{{ row[0] }}</td>
        <td>{{ row[1] }}</td>
        <td>{{ row[2] }}</td>
        <td>{{ row[3] }}%</td>
        <td>{{ row[4] }}%</td>
        <td>{{ row[5] }}</td>
        <td>{{ row[6] }}%</td>
        <td>{{ row[7] }}%</td>
        <td>
          <i class="bi bi-x-octagon-fill red-value" v-if="row[5] == 0"></i>
          <i class="bi bi-exclamation-triangle-fill yellow-value" v-if="row[5] > row[2]"></i>
          <i class="bi bi-clipboard-x yellow-value" v-if="row[2] < trainAverage"></i>
          <i class="bi bi-clipboard-minus yellow-value" v-if="row[5] < testAverage"></i>
          <i
            class="bi bi-check-circle-fill green-value"
            v-if="row[5] !== 0 && row[5] <= row[2] && row[2] >= trainAverage && row[5] >= testAverage"
          ></i>
        </td>
      </tr>
    </table>
  </div>
</template>
