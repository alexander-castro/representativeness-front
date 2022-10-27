<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      files: null,
      API: this.$API,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = `${this.API}`;
      this.files = await (await fetch(url)).json();
    },
  },
});
</script>

<template>
  <div class="block">
    <h1 class="title">Analizador de representatividad</h1>
  </div>
  <div class="block">
    <h2 class="subtitle">Lista de archivos</h2>
    <ul>
      <li style="padding-top: 12px" v-for="file in files" :key="file">
        <router-link
          :to="{ name: 'reportes', params: { nombre: file } }"
          class="button is-link"
        >
          {{ file }}
        </router-link>
      </li>
    </ul>
  </div>
  <div class="block">
    <router-link to="/nuevo" class="button is-link is-light"
      >Subir archivo</router-link
    >
  </div>
</template>
