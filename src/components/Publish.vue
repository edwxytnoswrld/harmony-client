<script setup lang="ts">
  import axios from "axios";
  import {ref} from "vue";
  import { useCookies } from "vue3-cookies";
  import VueJwtDecode from 'vue-jwt-decode'
  import router from "@/router";

  const content = ref("")
  const songMetadata = ref("")
  const { cookies } = useCookies();
  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const audioFile = ref(null)
  const midiFile = ref(null)
  const pdfFile = ref(null)

  function onFileChange(e: { target: { files: any; }; dataTransfer: { files: any; }; }) {
    var files = e.target.files || e.dataTransfer.files;
    if(!files.length)
      return;
    let extension = files[0].name.split('.').pop()
    if(extension == "mp3" || extension == "wav" || extension == "flac" || extension == "ogg") {
      audioFile.value = files[0]
    } else if(extension == "mid") {
      midiFile.value = files[0]
    } else if(extension == "pdf") {
      pdfFile.value = files[0]
    }
  }

  function publish() {
    const formData = new FormData();
    const token = ref(cookies.get("token"))
    if (token.value != null) {
      let decoded = VueJwtDecode.decode(token.value)
      formData.append("userId", decoded.userId) // actually, why? we can already authorize
      formData.append('content', content.value)
      formData.append("audioFile", audioFile.value)
      formData.append("midiFile", midiFile.value)
      formData.append("pdfFile", pdfFile.value)
      if(songMetadata.value != "") {
        formData.append("songMetadata", songMetadata.value)
      } else {
        formData.append("songMetadata", null)
      }
      let config = {
        headers: {
          Authorization: "Bearer " + token.value,
        }
      }
      axios.post(server_url + "/api/posts/publish", formData, config)
          .then(async function (response) {
            //handle success
            console.log(response.data);
            await router.push('/publication/' + response.data)
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
  <div class="ms-5 bg-light" id="wrapper">
    <div class="top-bar" style="padding-left: 15px;">
      <i class="bi bi-arrow-left align-middle" style="font-size: 1.5rem; margin-right:10px;"></i>
      <span class="align-middle" style="line-height: 1.5rem;">Publicēt</span>
    </div>
    <div class="bottom-bar">
      <form>
        <textarea class="form-control mb-4" id="content-area" rows="10" v-model="content"></textarea>
        <div class="container" style="padding-left: 0px; margin-left: 0px; margin-right:0px; width:100%;">
          <div class="row align-items-baseline p-0" style="width: 50%; margin-left: 0px; margin-right:0px;">
            <div class="col p-0">
              <div class="mb-3">
                <span class="me-3 p-0 align">Audiofails</span>
              </div>
            </div>
            <div class="col p-0">
              <label for="mp3-upload" class="btn btn-secondary">
                Lejupielādēt
              </label>
              <input id="mp3-upload" class="d-none" type="file" @change="onFileChange">
            </div>
            <div class="col p-0">
              <div class="mb-3"><span class="me-3 p-0">midi</span></div>
            </div>
            <div class="col p-0">
              <label for="midi-upload" class="btn btn-secondary">
                Lejupielādēt
              </label>
              <input id="midi-upload" class="d-none" type="file" @change="onFileChange">
            </div>
          </div>
          <div class="row align-items-baseline p-0" style=" margin-left: 0px; margin-right:0px; width:50%;">
            <div class="col p-0">
              <div class="mb-3"><span class="me-3">Videofails</span>
              </div>
            </div>
            <div class="col p-0">
              <button class="btn btn-secondary" type="button">Lejupielādēt</button>
            </div>
            <div class="col p-0">
              <span class="me-3 p-0">pdf</span>
            </div>
            <div class="col p-0">
              <label for="pdf-upload" class="btn btn-secondary">
                Lejupielādēt
              </label>
              <input id="pdf-upload" class="d-none" type="file" @change="onFileChange">
            </div>
          </div>
          <div class="row p-0" style=" margin-left: 0px; margin-right:0px; width:100%;">
            <div class="col p-0">
              <label for="additional-data-area" class="mb-2 p-0">Papilddati: </label>
              <textarea class="form-control mb-3" id="additional-data-area" rows="3" style="width:47.5%;" v-model="songMetadata"></textarea>
            </div>
          </div>
        </div>

        <button type="button" @click="publish" class="btn btn-primary">Submit</button>
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