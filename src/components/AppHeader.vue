<template>
  <nav class="navbar navbar-expand-lg bg-primary bg-gradient">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-for="item in list" :key="item.to">
          <router-link :to="item.to" class="nav-link active text-white fw-bold">{{item.title}}</router-link>
        </li>
      </ul>
      <button class="nav-link active text-white fw-bold" @click="$emit('open-sign-up-modal')">Sign Up</button>
      <button class="nav-link active text-white fw-bold ps-3" @click="$emit('open-login-modal')">Login</button>

    </div>
  </div>
</nav>
</template>

<script>

export default {
  data(){
    return {
      list:[
        {title:'Dc Hero', to:"/dc-hero"},
        {title:'Calendar', to:"/calendar"},
        {title:'Clock', to:"/clock"},
        {title:'Curd_Operation', to:"/curd"},
        {title:'MarkDown', to:"/markdown"},
        {title:'Google Map', to:"/googlemaps"},
      ],
    }
  },
}
</script>

<style>

</style>