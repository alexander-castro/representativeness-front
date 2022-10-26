<template>
  <h1>Subir nuevo archivo</h1>
  <form method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit" value="Cargar" />
  </form>
  <router-link to="/" class="button is-info">Volver</router-link>
</template>
