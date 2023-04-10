<script setup lang="ts">
  import PublicationPreview from "@/components/PublicationPreview.vue";
  import {onBeforeMount, ref} from "vue";
  import axios from "axios";
  import { useCookies } from "vue3-cookies";

  // User token is stored in cookies
  const { cookies } = useCookies();
  const token = ref(cookies.get("token"))

  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const posts = ref([])

  // User token is added to every request to authorize the user
  let config = {
    headers: {
      Authorization: "Bearer " + token.value,
    }
  }

  // Get posts for timeline
  onBeforeMount(() => {
    axios.get(server_url + "/api/posts/get-all", config)
        .then(function (response) {
          posts.value = response.data.modelList

          console.log(posts.value);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  })


</script>

<template>
  <!-- Show every post -->
  <div v-for="post in posts">
    <PublicationPreview :post="post"/>
  </div>
</template>
