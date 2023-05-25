<template>
  <div class="w-auto">
    <h1 class="text-center fs-2 mb-3">Vue Calendar</h1>
    <section class="mx-3 d-flex justify-content-between fs-2">
      <h3>{{ currentMonthName }}</h3>
      <h3>{{ currentYear }}</h3>
    </section>
    <section class="d-flex">
      <p class="al text-center fs-5" v-for="day in days" :key="day">{{ day }}</p>
    </section>
    <section class="d-flex flex-wrap">
      <p class="al text-center" v-for="num in startDay()" :key="num"> * </p>
      <p class="al text-center" 
      v-for="num in daysInMethods()" :key="num"
      :class="currentDateClass(num) ? 'btn btn-outline-danger btn-sm':''"
      @click="currentDateClass(num) ? dateAlart():null"
      >
        {{ num }}
      </p>
      <p class="al text-center" v-for="num in remainingDaysEndOfTheWeek()" :key="num"> * </p>
    </section>
    <section class="d-flex justify-content-between my-2">
      <button class="px-2 border rounded" @click="prev">Prev</button>
      <button class="px-2 border rounded" @click="next">Next</button>
    </section>
  </div>
  <img :src="t" >
</template>

<script>
export default {
  data() {
    return {
      t:"../assets/chat/prof1.jpg",
      currentDate : new Date().getUTCDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      days: ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"],
    }
  },
  methods:{
    daysInMethods(){
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    startDay(){
      return new Date(this.currentYear, this.currentMonth, 1).getDay()
    },
    remainingDaysEndOfTheWeek(){
      return 6 - new Date(this.currentYear, this.currentMonth, this.daysInMethods(this.currentYear, this.currentMonth)).getDay();
    },
    next(){
      if(this.currentMonth == 11){
        this.currentMonth =0;
        this.currentYear++;
      }else{
        this.currentMonth++
      }
      
      console.log(this.currentMonth);
    },
    prev(){
      if(this.currentMonth == 0){
        this.currentMonth =11;
        this.currentYear--;
      }else{
        this.currentMonth--
      }
    },
    currentDateClass(num){
      return new Date(this.currentYear, this.currentMonth, num).toDateString() === new Date().toDateString();
    },
    dateAlart(){
      alert(new Date().toDateString())
    }
  },
  computed: {
    currentMonthName(){
      return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: "long" })
    }
  }
}
</script>

<style>
.al {
  width: 14.28%;
}
</style>