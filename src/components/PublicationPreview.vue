<script setup lang="ts">
  import router from '@/router';
  import {onBeforeMount, onMounted, onUpdated, ref} from "vue";
  import axios from "axios";
  import VueJwtDecode from 'vue-jwt-decode'
  import { useCookies } from "vue3-cookies";
  import {useAVLine} from "vue-audio-visual";

  const { cookies } = useCookies();
  const token = ref(cookies.get("token"))

  const props = defineProps(['post'])
  const avatar_url = ref("user-photos/0/default.png")
  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const liked = ref(false)

  const player = ref(null)
  const plyr = ref(null)
  const canvas = ref(null)
  if(props.post.mp3Url != null) useAVLine(player, canvas, { src: server_url + '/api/' + props.post.mp3Url, lineColor: "#00b3ff"})

  if(props.post.avatarUrl != null) {
    avatar_url.value = props.post.avatarUrl
  }

  let config = {
    headers: {
      Authorization: "Bearer " + token.value,
    }
  }

  onBeforeMount(() => {
    isLiked()
  })

  function updatePlaying() {
    let el = document.getElementById('canvas' + props.post.id)
    el.classList.add('d-block')
    el.classList.remove('d-none')
  }

  function stopPlaying() {
    let el = document.getElementById('canvas' + props.post.id)
    el.classList.add('d-none')
    el.classList.remove('d-block')
  }

  onMounted(() => {
    if(props.post.mp3Url != null) {
      let el = document.getElementById('plyrplay' + props.post.id)
      console.log('plyrplay' + props.post.id)
      console.log(el)
      el.addEventListener('playing', () => updatePlaying())
      el.addEventListener('pause', () => stopPlaying())
      el.addEventListener('ended', () => stopPlaying())
    }
  })

  function goToPost() {
    router.push({path: '/publication/' + props.post.id})
  }

  function goToUser() {
    router.push({path: '/user/' + props.post.userId})
  }

  function isLiked() {
    let userId = VueJwtDecode.decode(token.value).userId

    axios.get(server_url + "/api/posts/is-liked?postId=" + props.post.id + "&userId=" + userId, config)
        .then(function (response) {
          //handle success
          liked.value = response.data
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }

  function likePost() {
    const formData = new FormData();
    formData.append('userId', VueJwtDecode.decode(token.value).userId);
    formData.append('postId', props.post.id);

    axios.post(server_url + "/api/posts/like", formData, config)
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

  function unlikePost() {
    const formData = new FormData();
    formData.append('userId', VueJwtDecode.decode(token.value).userId);
    formData.append('postId', props.post.id);

    axios.post(server_url + "/api/posts/unlike", formData, config)
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
  <div class="wrapper ms-5 mt-4 mb-4 bg-light" id="publication-preview-wrapper">
    <div class="d-flex mb-3">
      <img :src="server_url + '/api/' + avatar_url" alt="" width="75" height="75" class="rounded-circle me-2 object-fit-cover pointer"
      @click="goToUser">
      <div class="ms-2 d-flex flex-column justify-content-center">
        <strong class="pointer" @click="goToUser">{{ post.name }}</strong> <!-- name -->
        <div class="align-items-center pointer" @click="goToUser">@{{ post.username }}</div> <!-- username -->
      </div>
      <div class="ms-auto">{{ post.createdDate }}</div> <!-- date -->
    </div>
    <p class="m-0 pointer" @click="goToPost">{{ post.content }}</p> <!-- message-content -->
    <div class="container w-100 mw-100 p-0 m-0" v-if="post.mp3Url">
      <div class="row w-100 align-items-center p-0 text-start" style="width: 50%; margin-left: 0px; margin-right:0px; max-width:50%;">
        <div class="col p-0">
          <vue-plyr ref="plyr" :id="'plyrplay' + props.post.id">
            <audio ref="player" controls crossorigin playsinline>
              <source
                  :src="server_url + '/api/' + post.mp3Url"
                  type="audio/mp3"
              />
            </audio>
          </vue-plyr>
        </div>
        <div class="col pt-2 ms-3">
          <div class="accordion" id="accordionExample" style="border-radius: 15px !important;" v-if="post.songMetadata">
            <div class="accordion-item">
              <h2 class="accordion-header" :id="'heading' + props.post.id">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + props.post.id" aria-expanded="true" aria-controls="collapseOne">
                  Skatīt datus
                </button>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :id="'collapse' + props.post.id" class="accordion-collapse collapse mb-0" :aria-labelledby="'heading' + props.post.id" data-bs-parent="#accordionExample" v-if="post.songMetadata">
      <div class="accordion-body">
        <p style="white-space: pre;" class="mb-1 mt-2">{{ post.songMetadata }}</p>
      </div>
    </div>
    <canvas ref="canvas" :id='"canvas" + props.post.id' class="d-none" />
    <div class="d-flex align-items-center mt-2" v-if="post.mp3Url || post.pdfUrl || post.midiUrl">
      <i class="bi bi-download me-3 align-middle pointer" style="font-size: 1.5rem;" @click="goToPost"></i>
      <span class="align-middle pointer" style="line-height: 1.5rem;" @click="goToPost">Pieejamas lejupielādes</span>
    </div>
    <div class="d-flex align-items-center mt-3">
      <div class="d-flex align-items-center me-4">
        <i v-if="!liked" class="bi bi-heart me-3 align-middle pointer" style="font-size: 1.5rem;" @click="likePost"></i>
        <i v-if="liked" class="bi bi-heart-fill me-3 align-middle pointer" style="font-size: 1.5rem;" @click="unlikePost"></i>
        <span class="align-middle" style="line-height: 1.5rem;">{{ post.likeCount }}</span>
      </div>
      <div class="d-flex align-items-center me-3 pointer" @click="goToPost">
        <i class="bi bi-chat-square-text me-3 align-middle" style="font-size: 1.5rem;"></i>
        <span class="align-middle" style="line-height: 1.5rem;">{{ post.replyCount }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.bi {
  width: 1em;
  height: 1.35em;
}
.wrapper {
  padding: 20px 30px;
  border-radius: 15px;
  border: 1px solid #ddd;
  width: 80%;
}

.pointer:hover {
  cursor: pointer;
}

.plyr--audio .plyr__controls {
  background: var(--bs-body-bg) !important;
  --bs-bg-opacity: 1 !important;
  color: var(--bs-body-color) !important;
  border-radius: 10px !important;
}

.plyr--audio { 
  padding: 5px 0px 5px 0px !important;
  margin: 10px 0px 0px 0px !important;
  /* width: 50%; */
}

.accordion-button:focus {
  box-shadow: none !important;
  border-color: rgba(0,0,0,.125) !important;
}

</style>
