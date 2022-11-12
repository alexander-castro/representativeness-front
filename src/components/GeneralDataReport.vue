<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
    force: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    binaryData: {
      type: Object,
      default: () => {},
    },
    isValidData: {
      type: Boolean,
      default: () => true,
    },
    invalidColumns: {
      type: Array,
      default: () => [],
    },
    binaryCategories: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<template>
  <h1 class="title">Dataset: {{ name }} - {{ force }}</h1>
  <div class="block">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">Datos originales:</h2>
        <table class="table">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column"
              :class="{ 'is-selected': index == columns.length - 1 }"
            >
              {{ column }}
            </th>
          </tr>
          <tr v-for="item in data" :key="item">
            <td
              v-for="(element, j) in item"
              :key="element"
              :class="{ 'is-selected': j == Object.keys(item).length - 1 }"
            >
              {{ element }}
            </td>
          </tr>
        </table>
      </div>
      <div class="column" v-if="isValidData">
        <h2 class="subtitle">Datos en categorias binarias:</h2>
        <table class="table">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column"
              :class="{ 'is-selected': index == columns.length - 1 }"
            >
              {{ column }}
            </th>
          </tr>
          <tr v-for="item in binaryData" :key="item">
            <td
              v-for="(element, j) in item"
              :key="element"
              :class="{ 'is-selected': j == Object.keys(item).length - 1 }"
            >
              {{ element }}
            </td>
          </tr>
        </table>
      </div>
      <div class="column" v-if="isValidData">
        <h2 class="subtitle">Categorias:</h2>
        <table class="table">
          <tr>
            <th>Categoria\Valor</th>
            <th>0</th>
            <th>1</th>
          </tr>
          <tr v-for="(value, key) in binaryCategories" :key="key">
            <td>{{ key }}</td>
            <td v-for="(_, categoryKey) in value" :key="categoryKey">
              {{ categoryKey }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div class="notification is-danger" v-if="!isValidData">
    Las siguientes columnas del conjunto de datos cargado no son binarias:
    <ul v-for="invalid_column in invalidColumns" :key="invalid_column">
      <li>{{ invalid_column }}</li>
    </ul>
  </div>
  <router-link to="/" class="button is-link is-light">Volver</router-link>
</template>
