<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      API: this.$API,
      files: [],
      file: "",
      showModal: false,
      showModalColumns: false,
      force: 2,
      columns: [],
      columnsSelection: [] as Array<string>,
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
    openForceModal(newLink: string) {
      this.file = newLink;
      this.showModal = true;
    },
    closeForceModal() {
      this.showModal = false;
    },
    async openColumnsModal(newLink: string) {
      this.file = newLink;
      this.columns = await (await fetch(`${this.API}files/${this.file}/columns`)).json();
      this.showModalColumns = true;
    },
    closeColumnsModal() {
      this.showModalColumns = false;
    },
  },
});
</script>

<template>
  <div class="block">
    <h1 class="title">Analizador de representatividad</h1>
  </div>
  <div class="block">
    <h2 class="subtitle">Conjuntos de datos</h2>
    <table class="table" style="text-align: center">
      <tr>
        <th>Archivo</th>
        <th>Ver reporte representatividad</th>
        <th>Ver clasificador representatividad</th>
      </tr>
      <tr v-for="file in files" :key="file">
        <td style="vertical-align: middle">
          {{ file }}
        </td>
        <td>
          <button @click="openForceModal(file)" class="button is-link" data-target="modal-force">
            Representatividad
          </button>
        </td>
        <td>
          <button @click="openColumnsModal(file)" class="button is-link" data-target="modal-columns">
            Clasificador
          </button>
        </td>
      </tr>
    </table>
  </div>
  <div class="block">
    <router-link to="/nuevo" class="button is-link is-light"> Subir archivo </router-link>
  </div>
  <div class="modal" id="modal-force" :class="{ 'is-active': showModal }" v-if="showModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Configurar</p>
          <button class="delete" aria-label="close" @click="closeForceModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Fuerza:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input type="number" class="input" v-model="force" />
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <router-link
            :to="{
              name: 'reportes',
              params: { nombre: file },
              query: { fuerza: force },
            }"
            class="button is-link"
          >
            Procesar {{ file }}
          </router-link>
          <button class="button" @click="closeForceModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
  <div class="modal" id="modal-columns" :class="{ 'is-active': showModalColumns }" v-if="showModalColumns">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Configurar clasificador</p>
          <button class="delete" aria-label="close" @click="closeColumnsModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Columnas:</label>
            </div>
            <div class="field-body" style="display: flex; flex-direction: column">
              <label class="checkbox" v-for="column in columns" v-bind:key="column">
                <input type="checkbox" :id="column" :value="column" v-model="columnsSelection" />
                {{ column }}
              </label>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <router-link
            :to="{
              name: 'clasificadores',
              params: { nombre: file, columnas: columnsSelection },
            }"
            class="button is-link"
          >
            Procesar {{ file }}
          </router-link>
          <button class="button" @click="closeColumnsModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
