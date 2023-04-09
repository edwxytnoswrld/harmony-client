<script setup lang="ts">
  import PublicationPreview from "@/components/PublicationPreview.vue";
  import { useCookies } from "vue3-cookies";
  import {ref} from "vue";
  import Login from "@/components/Login.vue";
  import TimelineView from "@/views/TimelineView.vue";

  const { cookies } = useCookies();

  const isLoggedIn = ref(cookies.get("token"))
</script>

<template>
  <main>
    <Login v-if="!isLoggedIn"/>
    <TimelineView v-else/>
  </main>
</template>
