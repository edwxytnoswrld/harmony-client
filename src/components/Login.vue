<script setup lang="ts">
  import axios from "axios";
  import {onMounted, ref} from "vue";
  import { useCookies } from "vue3-cookies";
  import router from "@/router";

  // User token is stored in cookies
  const { cookies } = useCookies();

  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const username = ref("")
  const password = ref("")

  // If login fails, user will not be redirected further
  const fail = ref(false)

  onMounted(() => {
        'use strict'
        var forms = document.getElementsByClassName('needs-validation');
        // Validate the form
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              login()
              event.preventDefault()
            }
            form.classList.add('was-validated');
          }, false)
        })
      }
  )

  function login() {
    fail.value = false
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('password', password.value);

    axios.post(server_url + "/api/authenticate", formData)
        .then(async function (response) {
          // Handle success
          console.log(response.data.token);
          // Set user token
          cookies.set("token", response.data.token)
          // Redirect to main page
          if (router.currentRoute.value.name == "login") {
            await router.push({name: 'home'})
            router.go(0)
          } else {
            await router.push({name: 'home'})
            router.go(0)
          }
        })
        .catch(function (response) {
          /// If login fails, user will not be redirected further
          fail.value = true
          var forms = document.getElementsByClassName('was-validated');
          forms[0].classList.remove('was-validated')
          console.log(response);
        });

  }
</script>

<template>
  <div class="d-flex align-items-center w-100 h-100">

    <div class="bg-light" id="login-wrapper">
      <div class="card-body">
        <h1 class="fs-4 card-title fw-bold mb-4">Ielogošanās</h1>
        <div class="alert alert-danger" role="alert" v-if="fail">
          Neizdodās ielogoties - mēģiniet vēlreiz!
        </div>
        <form method="POST" class="needs-validation" novalidate="" autocomplete="off">
          <div class="mb-3">
            <label class="mb-2 text-muted" for="email">Lietotājvārds</label>
            <input id="username" type="text" v-model="username" class="form-control" name="username" required autofocus>
            <div class="invalid-feedback">
              Ievadiet lietotājvārdu!
            </div>
          </div>

          <div class="mb-3">
            <div class="mb-2 w-100">
              <label class="text-muted" for="password">Parole</label>
            </div>
            <input id="password" type="password" v-model="password" class="form-control" name="password" required>
            <div class="invalid-feedback">
              Ievadiet paroli!
            </div>
          </div>

          <div class="d-flex align-items-center">
            <button type="submit" class="btn btn-primary ms-auto" @submit="login()">
              Ielogoties
            </button>
          </div>
        </form>
      </div>
      <div class="card-footer py-3 border-0">
        <div class="text-center">
          Vēl nav konta?
          <RouterLink to="/register" class="nav-link link-primary" aria-current="page">Reģistrējieties</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .bi {
    width: 1em;
    height: 1.35em;
  }

  #login-wrapper {
    padding: 20px 30px;
    border-radius: 15px;
    border: 1px solid #ddd;
    width: 40%;
    display: block;
    max-height: 80vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .card-body, .card-footer {
    padding: 20px 30px;
  }
</style>