<template>
  <div class="d-flex flex-wrap w-100">
    <h1 class="w-100 text-center my-2 fs-2">MarkDown App</h1>
    <section class="d-flex w-75 m-auto vh-100">
      <article class="w-50 border">
        <textarea class="w-100 h-100"  :value="text" @input="update"></textarea>
      </article>
      <article class="w-50 border right" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import {marked} from "marked"
import debounce from "../utilities/debounce"
export default {
  mixins:[debounce],
  data(){
    return{
      text:'',
    }
  },
  computed:{
    markedText(){
      return marked(this.text);
    }
  },
  methods:{
    update(e){
      const task = ()=> (this.text = e.target.value);
      this.debounce(task, 500)
    },
  },
}
</script>

<style>
.right{
  background-color: gray;
}
</style>