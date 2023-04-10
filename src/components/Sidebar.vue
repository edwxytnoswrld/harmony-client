<script setup>
  import { useCookies } from "vue3-cookies";
  import {ref} from "vue";
  import VueJwtDecode from 'vue-jwt-decode'
  import axios from "axios";
  import router from "@/router";

  const name = ref("Viesis")
  const username = ref("User")
  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const { cookies } = useCookies();

  const token = ref(cookies.get("token"))
  const avatar_url = ref("user-photos/0/default.png")
  if (token.value != null) {
    let decoded = VueJwtDecode.decode(token.value)
    if(decoded.exp <= Math.floor(Date.now() / 1000)) {
      logout()
    }
    name.value = decoded.name
    username.value = decoded.username
    let config = {
      headers: {
        Authorization: "Bearer " + token.value,
      }
    }
    axios.get(server_url + "/api/users/get-avatar-url?userId=" + decoded.userId, config).then(function (response) {
        //handle success
        if(response.data) {
          console.log(response.data)
          avatar_url.value = response.data
          console.log(avatar_url.value)
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  async function logout() {
    cookies.remove('token')
    await router.push({name: 'home'})
    router.go(0)
  }

  function goToUser() {
      router.push({path: '/user/' + VueJwtDecode.decode(token.value).userId})
  }

</script>

<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light side" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Harmony</span>
    </a>
    <hr>
    <div class="dropdown">
      <div class="d-flex align-items-center"  aria-expanded="false">
        <img v-if="!token" :src="server_url + '/api/' + avatar_url" alt="" width="100" height="100"
           class="rounded-circle me-2 object-fit-cover">
        <img v-else :src="server_url + '/api/' + avatar_url" alt="" width="100" height="100"
           class="rounded-circle me-2 object-fit-cover pointer" @click="goToUser">
        <div class="ms-1 align-middle">
          <strong v-if="!token">{{ name }}</strong>
          <strong v-else class="pointer" @click="goToUser">{{ name }}</strong> <br/>
          <span v-if="token" class="pointer" @click="goToUser">@{{ username }}</span>
        </div>
      </div>
    </div>
    <hr>
    <ul v-if="token" class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <RouterLink to="/" class="mt-3 mb-3 ms-3 d-inline-block p-0 nav-link link-dark" aria-current="page">
          Galvenā lapa
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/publish" class="ms-3 mb-3 d-inline-block p-0 nav-link link-dark">
          Publicēt
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/settings" class="ms-3 mb-3 d-inline-block p-0 nav-link link-dark">
          Iestatījumi
        </RouterLink>
      </li>
      <li>
        <div class="ms-3 d-inline-block p-0 pointer" @click="logout">Izrakstīties</div>
      </li>
    </ul>
    <div class="text-center" v-else>
      <RouterLink to="/login" class="nav-link link-primary m-0 p-0 d-inline-block">Ielogojieties</RouterLink><span>, lai izmantotu pilno tīmekļa vietni,<br/></span>
      <span>vai </span><RouterLink to="/register" class="nav-link link-primary m-0 p-0 d-inline-block">izveidojiet jauno kontu</RouterLink>!
    </div>

  </div>
</template>



<style scoped>

.side {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-toggle-nav a {
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

</style>