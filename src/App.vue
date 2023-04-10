<script setup lang="ts">
  import { RouterView } from 'vue-router'

</script>

<template>
    <main class="d-flex flex-nowrap">

      <RouterView name="sidebar" />
      <RouterView name="main"/>
<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
    </main>

<!--  <RouterView />-->
</template>

<style scoped>
body {
  min-height: 100vh;
  /*min-height: -webkit-fill-available;*/
}

html {
  max-height: 100% !important;
  height: 100% !important;
}

main {
  height: 100vh;
  width: 100%;
  /*height: -webkit-fill-available;*/
  max-height: 100vh;
  overflow-x: auto;
  /* overflow-y: scroll; */
}

.scrollarea {
  overflow-y: auto;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}


</style>
