<script setup lang="ts">
  import { ref } from 'vue';
  import axios from "axios";
  import VueJwtDecode from 'vue-jwt-decode'
  import { useCookies } from "vue3-cookies"
  import { useRouter, useRoute } from 'vue-router'

  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const router = useRouter()

  const image = ref(null)
  const { cookies } = useCookies();
  const token = ref(cookies.get("token"))
  let decoded = VueJwtDecode.decode(token.value)

  const name = ref(null)
  const email = ref(null)
  const username = ref(null)
  const password = ref(null)

  const config = {
    headers: {
      Authorization: "Bearer " + token.value,
      'content-type': 'multipart/form-data'
    }
  }

  async function updateData() {
    if (image.value != null) {
      const formData = new FormData();
      formData.append('avatar', image.value)
      formData.append('userId', decoded.userId)

      axios.post(server_url + "/api/users/update-avatar", formData, config)
          .then(async function (response) {
            //handle success
            await console.log(response.data);
            if(name.value == null && username.value == null && password.value == null && email.value == null) {
              await router.push({name: 'home'})
              await router.go(0)
            }
          })
          .catch(function (response) {
            console.log(image.value)
            console.log(response);
          });
    }
    const formData = new FormData();
    if (name.value != null) formData.append('name', name.value)
    if (email.value != null) formData.append('email', email.value)
    if (username.value != null) formData.append('username', username.value)
    if (password.value != null) formData.append('name', password.value)

    if (Array.from(formData.keys()).length > 0) {
      formData.append("userId", decoded.userId) // actually, why? we can already authorize
      axios.post(server_url + "/api/users/update-data", formData, config)
          .then(async function (response) {
            //handle success
            await console.log(response);

            cookies.remove("token")
            await router.push({name: 'home'})
            await router.go(0)
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
  }

  }

  function onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return;
    image.value = files[0]
    console.log(image.value)
  }


</script>

<template>
    <div class="ms-5 bg-light" id="wrapper">
      <div class="top-bar" style="padding-left: 15px;">
          <i class="bi bi-arrow-left align-middle" style="font-size: 1.5rem; margin-right:10px;"></i>
          <span class="align-middle" style="line-height: 1.5rem;">Iestatījumi</span>
      </div>
      <div class="bottom-bar">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Vārds</label>
            <input type="text" class="form-control" id="name" v-model="name">
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Lietotājvārds</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-pasts</label>
            <input type="email" class="form-control" id="email" v-model="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Parole</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="mb-3"><span class="me-3">Mainīt profila bildi</span>
            <label for="file-upload" class="btn btn-secondary">
                Lejupielādēt
            </label>
            <input id="file-upload" class="d-none" type="file" @change="onFileChange">
          </div>
          <button type="button" class="btn btn-primary" @click="updateData">Submit</button>
        </form>
      </div>
    </div>
</template>

<style>
#wrapper {
  /*border: 1px solid #ddd;*/
  /*height: 100%;*/
  /*max-height:100%;*/
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 15px;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  /* overflow-y: scroll; */
}

.bottom-bar {
  padding: 30px 50px;
  border: solid #ddd;
  border-width: 1px 0px 0px 0px;
}

.top-bar {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  border: solid #ddd;
  border-width: 0px 0px 0px 0px;
}
</style>
