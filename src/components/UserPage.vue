<script setup lang="ts">
  import {onBeforeMount, ref} from 'vue';
  import PublicationPreview from "@/components/PublicationPreview.vue";
  import axios from "axios";
  import {useCookies} from "vue3-cookies";
  import VueJwtDecode from 'vue-jwt-decode'
  import router from "@/router";

  const props = defineProps(['userId'])
  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const { cookies } = useCookies();
  const token = ref(cookies.get("token"))

  const user = ref([])
  const avatar_url = ref("user-photos/0/default.png")
  const takeInput = ref(false)
  const title = ref(null)
  const biography = ref(null)
  const location = ref(null)
  const posts = ref(null)

  let decoded = VueJwtDecode.decode(token.value)

  let config = {
    headers: {
      Authorization: "Bearer " + token.value,
    }
  }

  onBeforeMount(async () => {
    await axios.get(server_url + "/api/users/get-by-id?id=" + props.userId, config)
        .then(function (response) {
          user.value = response.data
          if (user.value.avatarUrl != null) {
            avatar_url.value = user.value.avatarUrl
          }
          location.value = user.value.location
          biography.value = user.value.biography
          title.value = user.value.title
          console.log(response.data)
          console.log(user.value);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    await axios.get(server_url + "/api/posts/get-by-user-id?userId=" + props.userId, config)
      .then(function (response) {
          posts.value = response.data
          console.log(posts.value)
      })
  })

  function changeUserData() {
    const formData = new FormData();

    if (token.value != null) {
      formData.append("userId", decoded.userId) // actually, why? we can already authorize
      if(title.value != null) formData.append('title', title.value)
      if(biography.value != null) formData.append("biography", biography.value)
      if(location.value != null) formData.append("location", location.value)
      let config = {
        headers: {
          Authorization: "Bearer " + token.value,
        }
      }
      console.log(formData)
      axios.post(server_url + "/api/users/update-data", formData, config)
          .then(function (response) {
            //handle success
            console.log(response);
            router.go(0)
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
    } else {
      // error handling
    }
  }
</script>

<template>
  <div class="ms-5 wrapped">
    <div class="top bg-light">
      <div class="top-bar" style="padding-left: 15px;">
        <i class="bi bi-arrow-left align-middle pointer" style="font-size: 1.5rem; margin-right:10px;" @click="router.push({path: '/'})"></i>
        <span class="align-middle" style="line-height: 1.5rem;">{{ user.name }}</span>
      </div>
      <div class="content-bar">
        <div class="d-flex mb-3">
          <img :src="server_url + '/api/' + avatar_url" alt="" width="75" height="75" class="rounded-circle me-2 object-fit-cover">
          <!-- avatar -->
          <div class="ms-2 d-flex flex-column justify-content-center">
            <strong>{{ user.name }}</strong> <!-- name -->
            <div class="align-items-center">@{{ user.username }}</div>
            <div class="align-items-center" v-if="!takeInput">{{ user.title }}</div>
            <div class="align-items-center" v-if="takeInput">
              <input type="text" v-model="title" class="form-control" placeholder="Title">
            </div>
          </div>
          <div class="ms-auto">
            <button v-if="!takeInput && props.userId == decoded.userId" type="button" class="btn btn-secondary" @click="takeInput = true">Redīģēt profilu</button>
            <button v-if="takeInput" type="button" class="btn btn-primary me-3" @click="changeUserData">Saglabāt</button>
            <button v-if="takeInput" type="button" class="btn btn-secondary" @click="takeInput = false">Atcelt</button>
          </div> <!-- date -->
        </div>
        <p class="m-0" v-if="!takeInput">{{ user.biography }}</p> <!-- message-content -->
        <div class="m-0" v-if="takeInput">
            <textarea v-model="biography" class="form-control w-75" name="nya" id="" rows="3" placeholder="Biography"></textarea>
        </div> <!-- message-content -->
        <div class="d-flex align-items-center mt-3">
          <div  class="d-flex align-items-center me-4">
            <i v-if="user.location || takeInput" class="bi bi-geo-alt me-3 align-middle" style="font-size: 1.5rem;"></i>
            <span class="align-middle" style="line-height: 1.5rem;" v-if="!takeInput">{{ user.location }}</span>
            <span class="align-middle" style="line-height: 1.5rem;" v-if="takeInput">
              <input class="form-control" type="text" placeholder="Location" v-model="location">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="posts-bar">
      <div v-for="post in posts">
        <PublicationPreview :post="post" class="m-0"/>
      </div>
    </div>
  </div>

</template>

<style>
.wrapped {
  /*border: 1px solid #ddd;*/
  /*height: 100%;*/
  /*max-height:100%;*/
  width: 80%;
  /*border: 1px solid #ddd;*/
  /*border-radius: 15px;*/
  /*height: 100vh;*/
  /*height: -webkit-fill-available;*/
  /*max-height: 100vh;*/
  overflow-x: auto;
  /* overflow-y: scroll; */
}
.top {
  border: 1px solid #ddd;
  border-radius: 15px;
}

.content-bar {
  padding: 20px 30px;
  border: solid #ddd;
  border-width: 1px 0px 0px 0px;
}

.write-bar {
  padding: 20px 30px;
  border: solid #ddd;
  border-width: 1px 0px 1px 0px;
}

.top-bar {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
}

.posts-bar > div > div {
  margin: 1.5rem 0 0 0 !important;
  width: 100%;
}
</style>
