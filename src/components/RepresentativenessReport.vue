<script lang="ts">
import { defineComponent } from "vue";
import PMatrix from "./ReportElements/PMatrix.vue";
import IndividualCombinations from "./ReportElements/IndividualCombinations.vue";
import RepresentativenessMetric from "./ReportElements/RepresentativenessMetric.vue";
import CombinationCharts from "./ReportElements/CombinationCharts.vue";

export default defineComponent({
  props: { name: String, force: String, type: String },
  components: { PMatrix, IndividualCombinations, RepresentativenessMetric, CombinationCharts },
  data() {
    return {
      API: this.$API,
      matrixPColumns: [],
      matrixPRows: [],
      matrixP: [],
      list: [],
      representativenessAverge: 0.0,
      countAverage: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = `${this.API}files/${this.name}?type=${this.type}&force=${this.force}`;
      const data = await (await fetch(url)).json();
      this.list = data.list;
      this.matrixPColumns = data.matrixPColumns;
      this.matrixPRows = data.matrixPRows;
      this.matrixP = data.matrixP;
      this.representativenessAverge =
        this.list.reduce((accumulator, currentValue) => accumulator + currentValue[4], 0) / this.list.length;
      this.countAverage =
        this.list.reduce((accumulator, currentValue) => accumulator + currentValue[2], 0) / this.list.length;
    },
  },
});
</script>

<template>
  <h1 class="title">Dataset: {{ name }} - {{ force }}</h1>
  <div class="block">
    <PMatrix
      :matrixP="matrixP"
      :matrixPRows="matrixPRows"
      :matrixPColumns="matrixPColumns"
      :countAverage="countAverage"
    />
    <IndividualCombinations :list="list" />
    <RepresentativenessMetric :representativeness-averge="representativenessAverge" />
    <CombinationCharts :force="force" :list="list" v-if="list.length > 0" />
  </div>
</template>
