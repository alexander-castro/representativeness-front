<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    representativenessAverge: {
      type: Number,
      required: true,
    },
  },
});
</script>

<template>
  <h2 class="subtitle">
    {{ $t("message.representativenessMetric") }}
    {{ representativenessAverge.toFixed(2) }} %
  </h2>
  <progress class="progress is-success" v-bind:value="representativenessAverge" max="100">
    {{ representativenessAverge.toFixed(2) }}%
  </progress>
</template>
