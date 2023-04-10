<script setup lang="ts">
  import Reply from "@/components/Reply.vue";
  import {onBeforeMount, onMounted, onUpdated, ref} from "vue";
  import axios from "axios";
  import { useCookies } from "vue3-cookies";
  import router from "@/router";
  import VueJwtDecode from 'vue-jwt-decode'
  import {useAVLine} from "vue-audio-visual";

  const props = defineProps(['postId'])
  const server_url = import.meta.env.VITE_APP_SERVER_URL

  const { cookies } = useCookies();
  const token = ref(cookies.get("token"))

  const post = ref([])
  const avatar_url = ref("user-photos/0/default.png")
  const liked = ref(false)

  // Audio elements
  const player = ref(null)
  const plyr = ref(null)
  const canvas = ref(null)

  // Audio visualizaton element
  useAVLine(player, canvas, { src: server_url + '/api/' + post.value.mp3Url, lineColor: "#00b3ff"})

  const replies = ref([])
  const replyContent = ref("")

  let config = {
    headers: {
      Authorization: "Bearer " + token.value,
    }
  }

  // Make visualization appear when audio is played
  function updatePlaying() {
    let el = document.getElementById('canvas' + post.value.id)
    el.classList.add('d-block')
    el.classList.remove('d-none')
  }

  // Make visualization disappear when audio is not played
  function stopPlaying() {
    let el = document.getElementById('canvas' + post.value.id)
    el.classList.add('d-none')
    el.classList.remove('d-block')
  }

  // Handle audio player event
  onUpdated(() => {
      let el = document.getElementById('plyrplay' + props.postId)
      if(el != null) {
        console.log('plyrplay' + props.postId)
        console.log(el)
        el.addEventListener('playing', () => updatePlaying())
        el.addEventListener('pause', () => stopPlaying())
        el.addEventListener('ended', () => stopPlaying())
      }

  })

  function goToUser() {
    router.push({path: '/user/' + post.value.userId})
  }

  function isLiked() {
    let userId = VueJwtDecode.decode(token.value).userId

    axios.get(server_url + "/api/posts/is-liked?postId=" + props.postId + "&userId=" + userId, config)
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
    formData.append('postId', props.postId);

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
    formData.append('postId', props.postId);

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

  function getReplies() {
    axios.get(server_url + "/api/replies/get-all?postId=" + props.postId, config)
        .then(function (response) {
          replies.value = response.data
          console.log(replies.value);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }

  // Get the post data before rendering the page
  onBeforeMount(() => {
    axios.get(server_url + "/api/posts/get-by-id?postId=" + props.postId, config)
        .then(function (response) {
          post.value = response.data
          if(post.value.avatarUrl != null) {
            avatar_url.value = post.value.avatarUrl
          }
          console.log(post.value);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    isLiked()
    getReplies()
  })

  function publishReply() {
    const formData = new FormData();
    formData.append('content', replyContent.value);
    formData.append('userId', VueJwtDecode.decode(token.value).userId);
    formData.append('postId', props.postId);

    axios.post(server_url + "/api/replies/publish", formData, config)
        .then(function (response) {
          //handle success
          console.log(response.data);
          getReplies()
          replyContent.value = ""
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }
</script>

<template>
    <div class="ms-5 bg-light" id="wrapper">
      <div class="top-bar" style="padding-left: 15px;">
          <i class="bi bi-arrow-left align-middle pointer" style="font-size: 1.5rem; margin-right:10px;" @click="router.push({path: '/'})"></i>
          <span class="align-middle" style="line-height: 1.5rem;">Publicējums</span>
      </div>
      <div class="content-bar">
        <div class="d-flex mb-3">
          <img :src="server_url + '/api/' + avatar_url" alt="" width="75" height="75" class="rounded-circle me-2 object-fit-cover pointer"
          @click="goToUser">
          <!-- avatar -->
          <div class="ms-2 d-flex flex-column justify-content-center">
            <strong class="pointer" @click="goToUser">{{ post.name }}</strong> <!-- name -->
            <div class="align-items-center pointer" @click="goToUser">@{{ post.username }}</div> <!-- username -->
          </div>
          <div class="ms-auto">{{ post.createdDate }}</div> <!-- date -->
        </div>
        <p class="m-0">{{ post.content }}</p> <!-- message-content -->
        <div class="container w-100 mw-100 p-0 m-0" v-if="post.mp3Url">
          <div class="row w-100 align-items-center p-0 text-start m-0" style="width: 50%; margin-left: 0px; margin-right:0px; max-width:50%;">
            <div class="col p-0">
              <vue-plyr ref="plyr" :id="'plyrplay' + props.postId">
                <audio ref="player" controls crossorigin playsinline>
                  <source
                      :src="server_url + '/api/' + post.mp3Url"
                      type="audio/mp3"
                  />
                </audio>
              </vue-plyr>
            </div>
            <div class="col pt-2 ms-3">
              <div v-if="post.songMetadata">
                <div class="accordion" id="accordionExample" style="border-radius: 15px !important;">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Skatīt datus
                      </button>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="post.songMetadata" id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p style="white-space: pre;" class="mb-1 mt-2">{{ post.songMetadata }}</p>
          </div>
        </div>
        <canvas ref="canvas" :id='"canvas" + props.postId' class="d-none"/>
        <div class="d-flex align-items-center mt-2" v-if="post.mp3Url || post.pdfUrl || post.midiUrl">
          <i class="bi bi-download me-3 align-middle" style="font-size: 1.5rem;"></i>
          <div class="align-middle" style="line-height: 1.5rem;">
            <a v-if="post.mp3Url" :href="server_url + '/api/' + post.mp3Url" class="nav-link link-primary d-inline-block">mp3</a>
            <span v-if="post.mp3Url && (post.pdfUrl || post.midiUrl)"> • </span>
            <a v-if="post.midiUrl" :href="server_url + '/api/' + post.midiUrl" class="nav-link link-primary d-inline-block">midi</a>
            <span v-if="post.midiUrl && post.pdfUrl"> • </span>
            <a v-if="post.pdfUrl" :href="server_url + '/api/' + post.pdfUrl" class="nav-link link-primary d-inline-block">pdf</a>
          </div>
        </div>
        <div class="d-flex align-items-center mt-3">
          <div class="d-flex align-items-center me-4">
            <i v-if="!liked" class="bi bi-heart me-3 align-middle pointer" style="font-size: 1.5rem;" @click="likePost"></i><i v-if="liked" class="bi bi-heart-fill me-3 align-middle pointer" style="font-size: 1.5rem;" @click="unlikePost"></i>
            <span class="align-middle" style="line-height: 1.5rem;">{{ post.likeCount }}</span>
          </div>
          <div class="d-flex align-items-center me-3">
            <i class="bi bi-chat-square-text me-3 align-middle" style="font-size: 1.5rem;"></i>
            <span class="align-middle" style="line-height: 1.5rem;">{{ post.replyCount }}</span>
          </div>
        </div> 
      </div>
      <div class="write-bar form-group">
        <label for="comment-area" class="mb-2">Komentēt: </label>
        <div class="d-flex align-items-center">
          <textarea class="form-control" id="comment-area" rows="3" v-model="replyContent"></textarea>
          <button type="submit" class="btn btn-primary ms-3" style="height:60px;" @click="publishReply">Submit</button>
        </div>
      </div>
      <div class="replies-bar" v-for="reply in replies">
        <Reply :reply="reply"/>
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
    overflow-y: scroll;
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
    box-shadow: none;
    border-color: rgba(0,0,0,.125);
  }
</style>

