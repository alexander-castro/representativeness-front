<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    columns: {
      type: Array<string>,
      default: () => [],
    },
    x_test: {
      type: Array,
      default: () => [],
    },
    y_pred: {
      type: Array<Number>,
      default: () => [],
    },
    y_test: {
      type: Array<Array<string>>,
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
      filter: false,
    };
  },
  methods: {
    translate(column: any, element: Number) {
      const object = this.$props.binaryCategories[column];
      return Object.keys(object).find((key) => object[key] === element);
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

.hide {
  display: none;
}
</style>

<template>
  <h3 class="title is-4">Predictions:</h3>
  <div class="block columns is-vcentered">
    <div class="field column">
      <label class="label">Show only fails</label>
      <div class="control">
        <input type="checkbox" v-model="filter" />
      </div>
    </div>
  </div>
  <table class="table">
    <tr>
      <th v-for="column in columns" :key="column">
        {{ column }}
      </th>
      <th>Successful</th>
    </tr>
    <tr
      v-for="(item, index) in x_test"
      :key="index"
      :class="{
        'red-value': y_pred[index] != +y_test[index][0],
        'green-value': y_pred[index] == +y_test[index][0],
        hide: filter && y_pred[index] == +y_test[index][0],
      }"
      class="p-matrix-numbers"
    >
      <td v-for="(element, col) in item" :key="element">
        {{ translate(columns[col], element) }}
      </td>
      <td>
        {{ translate(columns[columns.length - 1], y_pred[index]) }}
      </td>
      <td>
        {{
          y_pred[index] == +y_test[index][0]
            ? $t("message.classificationResultYes")
            : $t("message.classificationResultNo")
        }}
      </td>
    </tr>
  </table>
  <h4 class="title is-4">Accuracy : {{ score }}</h4>
</template>
