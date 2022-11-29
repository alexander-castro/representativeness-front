<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      API: this.$API,
      files: [],
      file: "",
      showConfigModal: false,
      force: 2,
      sampling: "random",
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
    async openConfigModal(newLink: string) {
      this.file = newLink;
      this.columns = await (await fetch(`${this.API}files/${this.file}/columns`)).json();
      this.columnsSelection = this.columns;
      this.showConfigModal = true;
    },
    closeConfigModal() {
      this.showConfigModal = false;
    },
  },
});
</script>

<template>
  <div class="block">
    <h1 class="title">{{ $t("message.title") }}</h1>
  </div>
  <div class="block">
    <h2 class="subtitle">{{ $t("message.dataSets") }}</h2>
    <table class="table" style="text-align: center">
      <tr>
        <th>{{ $t("message.file") }}</th>
        <th colspan="2">{{ $t("message.reports") }}</th>
      </tr>
      <tr v-for="file in files" :key="file">
        <td style="vertical-align: middle">
          {{ file }}
        </td>
        <td>
          <router-link
            :to="{
              name: 'reporte',
              params: { nombre: file },
              query: { fuerza: 2 },
            }"
            class="button is-link"
          >
            {{ $t("message.generalReport") }}
          </router-link>
        </td>
        <td>
          <button @click="openConfigModal(file)" class="button is-link" data-target="modal-config">
            {{ $t("message.comparativeReport") }}
          </button>
        </td>
      </tr>
    </table>
  </div>
  <div class="block">
    <router-link to="/nuevo" class="button is-link is-light"> {{ $t("message.uploadFile") }} </router-link>
  </div>
  <div class="modal" id="modal-config" :class="{ 'is-active': showConfigModal }" v-if="showConfigModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Configurar clasificador</p>
          <button class="delete" aria-label="close" @click="closeConfigModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Muestreo:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="select">
                  <select v-model="sampling">
                    <option value="random">Aleatorio</option>
                    <option value="stratified">Estratificado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
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
              name: 'reportes',
              params: { nombre: file },
              query: { fuerza: force, columnas: columnsSelection, muestreo: sampling },
            }"
            class="button is-link"
          >
            Procesar {{ file }}
          </router-link>
          <button class="button" @click="closeConfigModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
