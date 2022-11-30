<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/GeneralComponents/NavbarPanel.vue";

export default defineComponent({
  components: { Navbar },
});
</script>

<template>
  <navbar />
  <section class="main-panel">
    <router-view></router-view>
  </section>
</template>

<style scoped>
.main-panel {
  margin: 20px 40px;
}
</style>
