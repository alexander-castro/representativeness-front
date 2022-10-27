<template>
  <h1 class="title">Subir nuevo archivo</h1>
  <form method="post" enctype="multipart/form-data" class="block">
    <input type="file" name="file" />
    <input type="submit" value="Cargar" class="button is-primary" />
  </form>
  <div class="block">
    <router-link to="/" class="button is-link is-light">Volver</router-link>
  </div>
</template>
