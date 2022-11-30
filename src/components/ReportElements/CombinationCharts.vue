<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  components: { Bar },
  props: {
    force: {
      type: String,
      required: true,
    },
    list: {
      type: Array<string>,
      required: true,
    },
  },
  data() {
    return {
      API: this.$API,
      colors: [
        "#0085c3",
        "#7ab800",
        "#f2af00",
        "#dc5034",
        "#ce1126",
        "#b7295a",
        "#6e2585",
        "#71c6c1",
        "#5482ab",
        "#009bbb",
        "#444444",
        "#eeeeee",
      ],
      chartData: [] as Array<object>,
    };
  },
  mounted() {
    let graphs: Record<string, { labels: Array<string>; data: Array<Number> }> = {};
    for (let element of this.list) {
      if (element[0] in graphs) {
        graphs[element[0]].labels.push(element[1]);
        graphs[element[0]].data.push(+element[2]);
      } else {
        graphs[element[0]] = { labels: [element[1]], data: [+element[2]] };
      }
    }
    let i = 0;
    for (let graph in graphs) {
      this.chartData.push(this.generate_char(i++, graph, graphs[graph].labels, graphs[graph].data));
    }
  },
  methods: {
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
</style>

<template>
  <h2 class="subtitle">{{ $t("message.combinationsByFoce") }}: {{ force }}</h2>
  <div class="columns" style="overflow-x: scroll">
    <div class="column" v-for="(data, index) in chartData" :key="index">
      <Bar :chart-data="data" class="graph" />
    </div>
  </div>
</template>
