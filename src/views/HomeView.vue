<script setup lang="ts">
  import { useCookies } from "vue3-cookies";
  import {ref} from "vue";
  import Login from "@/components/Login.vue";
  import TimelineView from "@/views/TimelineView.vue";

  const { cookies } = useCookies();

  const isLoggedIn = ref(cookies.get("token"))
</script>

<template>
  <main>
    <!-- Change main component to login if user is not logged in -->
    <Login v-if="!isLoggedIn"/>
    <TimelineView v-else/>
  </main>
</template>
