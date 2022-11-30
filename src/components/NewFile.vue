<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      API: this.$API,
      file: "",
      message: false,
      error: false,
    };
  },
  methods: {
    changeFile(event) {
      this.message = false;
      this.error = false;
      if (event !== null && event.target !== null) {
        this.file = event.target.files[0];
      }
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      const headers = { "Content-Type": "multipart/form-data" };
      this.axios.post(this.API + "/nuevo", formData, { headers }).then((res) => {
        if (res.status === 200) {
          this.message = true;
        } else {
          this.error = true;
        }
      });
    },
  },
});
</script>

<template>
  <div class="block" style="width: 50%">
    <h1 class="title">Subir nuevo archivo</h1>
    <div class="block">
      <input type="file" name="file" @change="changeFile" ref="file" />
    </div>
    <div class="block" style="display: flex; flex-direction: column">
      <input type="submit" value="Cargar" class="button is-primary" @click="uploadFile" />
    </div>
    <div class="block">
      <div class="notification is-danger" v-if="error">
        <h1 class="subtitle">Error</h1>
      </div>
      <div class="notification is-primary" v-if="message">
        <h1 class="subtitle">The file was upload!</h1>
      </div>
    </div>
  </div>
</template>
