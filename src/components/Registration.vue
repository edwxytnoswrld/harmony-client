<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import router from "@/router";

  const server_url = import.meta.env.VITE_APP_SERVER_URL

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
            register()
            event.preventDefault()
          }
          form.classList.add('was-validated');
        }, false)
      })
    }
  )

  const name = ref("")
  const username = ref("")
  const email = ref("")
  const password = ref("")

  function register() {
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('name', name.value);

    axios.post(server_url + "/api/register", formData)
        .then(function (response) {
          // Handle success
          console.log(response);
          router.push({name: "login"})
        })
        .catch(function (response) {
          // Handle error
          console.log(response);
        });

  }
</script>

<template>
  <div class="d-flex align-items-center w-100 h-100">

    <div class="bg-light" id="login-wrapper">
      <div class="card-body p-5">
        <h1 class="fs-4 card-title fw-bold mb-4">Reģistrēties</h1>
        <form class="needs-validation" novalidate="" method="POST" autocomplete="off">
          <div class="mb-3">
            <label class="mb-2 text-muted" for="name">Vārds</label>
            <input id="name" type="text" v-model="name" class="form-control" name="name" required autofocus>
            <div class="invalid-feedback">
              Ievadiet vārdu!
            </div>
          </div>

          <div class="mb-3">
            <label class="mb-2 text-muted" for="username">Lietotājvārds (unikāls)</label>
            <input id="name" type="text" v-model="username" class="form-control" name="username" required>
            <div class="invalid-feedback">
              Ievadiet lietotājvārdu!
            </div>
          </div>

          <div class="mb-3">
            <label class="mb-2 text-muted" for="email">E-pasts</label>
            <input id="email" type="email" v-model="email" class="form-control" name="email" required>
            <div class="invalid-feedback">
              Nepareizs e-pasts!
            </div>
          </div>

          <div class="mb-3">
            <label class="mb-2 text-muted" for="password">Parole</label>
            <input id="password" type="password" v-model="password" class="form-control" name="password" required>
            <div class="invalid-feedback">
              Ievadiet paroli!
            </div>
          </div>

          <div class="align-items-center d-flex">
            <button type="submit" class="btn btn-primary ms-auto" @submit="register()">
              Reģistrēties
            </button>
          </div>
        </form>
      </div>
      <div class="card-footer py-3 border-0">
        <div class="text-center">
          Jau ir konts?
          <RouterLink to="/login" class="nav-link link-primary" aria-current="page">Ielogojieties</RouterLink>
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