<template>
  <section @click="close" class="fed z-2"></section>
  <div class="main-wrf">
    <div class="m-auto bg-white p-3 rounded shadow z-3 w-25">
      <div class="p-3 border rounded">
        <h1 class="text-dark">
          <slot name="title"></slot>
        </h1>
        <main>
          <slot name="body"></slot>
        </main>
        
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  setup(_, {emit}){
    function close(){
      emit('close')
    }
    
    return {close}
  }
}
</script>

<style>
.fed {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.349);
}
.main-wrf {
    position: absolute;
    top: 45px;
    right: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>