<script setup lang="ts">
  import {onBeforeMount, ref} from "vue";
  import { useCookies } from "vue3-cookies";
  import router from "@/router";
  import VueJwtDecode from 'vue-jwt-decode'
  import axios from "axios";

  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const props = defineProps(['reply'])
  const avatar_url = ref("user-photos/0/default.png")

  const { cookies } = useCookies();
  const token = ref(cookies.get("token"))

  const liked = ref(false)

  let config = {
    headers: {
      Authorization: "Bearer " + token.value,
    }
  }

  console.log(props.reply)
  if(props.reply.avatarUrl != null) {
    avatar_url.value = props.reply.avatarUrl
  }

  onBeforeMount(() => {
    isLiked()
  })

  function goToUser() {
      router.push({path: '/user/' + props.reply.userId})
  }

  function isLiked() {
    let userId = VueJwtDecode.decode(token.value).userId

    axios.get(server_url + "/api/replies/is-liked?replyId=" + props.reply.id + "&userId=" + userId, config)
        .then(function (response) {
          //handle success
          liked.value = response.data
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }

  function likeReply() {
    const formData = new FormData();
    formData.append('userId', VueJwtDecode.decode(token.value).userId);
    formData.append('replyId', props.reply.id);

    axios.post(server_url + "/api/replies/like", formData, config)
        .then(function (response) {
          //handle success
          console.log(response.data);
          router.go(0)
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }

  function unlikeReply() {
    const formData = new FormData();
    formData.append('userId', VueJwtDecode.decode(token.value).userId);
    formData.append('replyId', props.reply.id);

    axios.post(server_url + "/api/replies/unlike", formData, config)
        .then(function (response) {
          //handle success
          console.log(response.data);
          router.go(0)
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }

</script>

<template>
  <div class="reply">
    <div class="d-flex mb-3">
      <img :src="server_url + '/api/' + avatar_url" alt="" width="75" height="75" class="rounded-circle me-2 object-fit-cover pointer"
      @click="goToUser">
      <div class="ms-2 d-flex flex-column justify-content-center">
        <strong class="pointer" @click="goToUser">{{ reply.name }}</strong> <!-- name -->
        <div class="align-items-center pointer" @click="goToUser">@{{ reply.username }}</div> <!-- username -->
      </div>
      <div class="ms-auto">{{ reply.createdDate }}</div> <!-- date -->
    </div>
    <p>{{ reply.content }}</p> <!-- message-content -->
    <div class="d-flex align-items-center">
      <div class="d-flex align-items-center me-4">
        <i v-if="!liked" class="bi bi-heart me-3 align-middle pointer" style="font-size: 1.5rem;" @click="likeReply"></i>
        <i v-if="liked" class="bi bi-heart-fill me-3 align-middle pointer" style="font-size: 1.5rem;" @click="unlikeReply"></i>
        <span class="align-middle" style="line-height: 1.5rem;">{{ reply.likeCount }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.bi {
  width: 1em;
  height: 1.35em;
}

.reply {
  padding: 20px 30px;
  border: solid #ddd;
  border-width: 0px 0px 1px 0px;
}

</style>