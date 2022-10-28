<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      files: null,
      file: "",
      showModal: false,
      force: 2,
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
    openForceModal(newLink: string) {
      this.file = newLink;
      this.showModal = true;
      console.log("in");
    },
    closeForceModal() {
      this.showModal = false;
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
        <button
          @click="openForceModal(file)"
          class="button is-link"
          data-target="modal-force"
        >
          {{ file }}
        </button>
      </li>
    </ul>
  </div>
  <div class="block">
    <router-link to="/nuevo" class="button is-link is-light"
      >Subir archivo</router-link
    >
  </div>
  <div
    class="modal"
    id="modal-force"
    :class="{ 'is-active': showModal }"
    v-if="showModal"
  >
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Configurar</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeForceModal"
          ></button>
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
</template>
