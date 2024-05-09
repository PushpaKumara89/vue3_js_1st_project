<template>
    <div class="w-auto">
        <h1 class="text-center fs-2 mb-3">Dc-hearos {{ herosCount }}</h1>
        <ul class="list-group">
            <li class="list-group-item border-0 d-flex justify-content-between p-0 mb-2" v-for="(hero , index) in dcHeros"
                :key="hero.name">
                <div>
                    {{ hero.name }}
                </div>
                <button type="button" class="btn-close" v-on:click="remove(index)"></button>
            </li>
        </ul>
        <form class="mt-5" @submit.prevent="addHero">
            <input class="border rounded"
                   v-model="newHero" placeholder="Type Hero name here"
                   ref="newDcHero"
            >
            <button class="border rounded bg-danger bg-gradient" type="submit">Add Hero</button>
        </form>
    </div>

</template>

<script>
export default {
    data() {
        return {
          show:false,
          newHero: "",
          dcHeros: [
            { name: "SuperGirl" },
            { name: "Flash" },
            { name: "Arrow" },
            { name: "SpiderMan" },
            { name: "SuperMan" },
          ],
        };
    },
    computed: {
        herosCount() {
            return this.dcHeros.length;
        },
    },
    methods: {
        addHero() {
            if (this.newHero.length > 0) {
                this.dcHeros.push({ name: this.newHero });
                this.clear()
            }
        },
        remove(index) {
            this.dcHeros = this.dcHeros.filter((hero, i) => i !== index);
          this.clear()
        },
      clear(){
        this.newHero = "";
        this.$refs.newDcHero.focus();
      }
    },
  mounted() {
      this.clear()
  }
}
</script>

<style></style>
