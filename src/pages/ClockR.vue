<template>
  <div class="main">
    <div class="wrapper">

      <div class="dropdown m-3">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ country }}
        </a>

        <ul class="dropdown-menu">
          <li v-for="cunt in countryTimeZones" :key="cunt"><a class="btn dropdown-item" @click="changeCunt(cunt)">{{cunt.country}}</a></li>
        </ul>
      </div>

      <h1 class="text-center text-light"> {{country}}</h1>

      <div id="clock">
        <div v-for="num in 12" :key="num" class="number"><span>{{num}}</span></div>


        <div v-for="num in 60" :key="num" class="tik-wrap" :style="getCssRotate(num)">
          <div class="tik" :style="getCssTik(num)"></div>
        </div>

        <div class="hands-wrap" id="minute-wrap">
          <div class="minute"></div>
        </div>
        <div class="hands-wrap" id="hour-wrap">
          <div class="hour"></div>
        </div>
        <div class="hands-wrap" id="second-wrap">
          <div class="second"></div>
        </div>
      </div>
      <h2 class="text-center text-light">{{time}}</h2>
    </div>
  </div>
</template>

<script>
import timer from "../utilities/timer"
export default {
  mixins:[timer],
  data(){
    return {
      intV:'',
      currentCountryCode: "Asia/Colombo",
      country:'SirLanka (Colombo)',
      countryTimeZones: [
        { country: "SirLanka (Colombo)", code: "Asia/Colombo" },
        { country: "United States (New York)", code: "America/New_York" },
        { country: "United Kingdom", code: "Europe/London" },
        { country: "India", code: "Asia/Kolkata" },
        { country: "Australia (Sydney)", code: "Australia/Sydney" },
        { country: "Canada (Toronto)", code: "America/Toronto" },
        { country: "Germany", code: "Europe/Berlin" },
        { country: "Japan", code: "Asia/Tokyo" },
        { country: "Brazil (Sao Paulo)", code: "America/Sao_Paulo" },
        { country: "China", code: "Asia/Shanghai" },
        { country: "France", code: "Europe/Paris" }
      ],
      time:""
    }
  },
  mounted() {
    this.intV = this.timer(this.timeCss, 1000)
  },
  methods:{
    changeCunt(cun){
      this.country = cun.country
      this.currentCountryCode = cun.code
      this.timer(this.timeCss, 1000)
    },
    getCssRotate(num){
      num *=6;
      return `transform: rotate(${num}deg);`
    },

    getCssTik(num){
      if (num%5 === 0){
        return `background-color: #000000;  width: 10px;`
      }else {
        return `background-color: gray;  width: 1px;`
      }
    },

    timeCss(){
      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: this.currentCountryCode
      };

      const timeString = now.toLocaleTimeString("en-US", options);
      const [time, period] = timeString.split(" ");
      this.time = time+" "+period;
      const [hour, minute, seconds] = time.split(":");

      let secondsEl = document.getElementById("second-wrap")
      let minuteEl = document.getElementById("minute-wrap")
      let hourEl = document.getElementById("hour-wrap")

      secondsEl.setAttribute('style', `transform: rotate(${seconds*6}deg);`)
      minuteEl.setAttribute('style', `transform: rotate(${minute*6}deg);`)
      hourEl.setAttribute('style', `transform: rotate(${hour*30+(30/60*minute)}deg);`)
    }
  },
  beforeUnmount() {
    clearInterval(this.intV)
  }
}
</script>

<style scoped>
.tik-wrap{
  position: absolute;
  text-align: center;
  width: 93%;
  height: 93%;
  display: flex;
  justify-content: center;
}
.tik{
  height: 12px;
  border-radius: 2px;
  margin-top: 0px;
  box-shadow: 1px 2px 3px #00000026;
}


.main{
  margin: 0;
  padding: 0;
}
.wrapper{
  height: 100vh;
  width: 100%;
  background-color: #25283D;
  font-family: 'josefin sans', sans-serif;
  float: left;
}
#clock {
  display: flex;
  width: 280px;
  height: 280px;
  background-color: #25283D;
  border: 18px solid #1e213a;
  border-radius: 50%;
  margin: 200px auto;
  position: relative;
  justify-content: center;
  align-items: center;
  box-shadow: inset
  0 5px 25px #00000080,
  0 5px 25px #00000080,
  0 5px 30px #00000080,
  0 5px 35px #00000080,
  0 5px 35px #00000080,
  0 5px 35px #00000080;
}
#clock::before {
  content: "";
  position: absolute;
  width: 280px;
  height: 280px;
  left: -18px;
  top: -10px;
  border: 18px solid #cccccc;
  border-radius: 50%;
  z-index: -2;
}
#clock::after {
  content: "";
  width: 18px;
  height: 18px;
  background-color: #c7d8f8;
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 9px);
  top: calc(50% - 9px);
  box-shadow:0 2px 4px #00000026;
}
.number{
  position: absolute;
  text-align: center;
  width: 90%;
  height: 90%;
}
.number span{
  display: block;
  color: #dbe7fd;
  font-size: 30px;
  text-shadow: 0 5px 18px #00000026, 0 2px 3px #00000033;
}
.number:nth-child(1) {
  transform: rotate(30deg);
}
.number:nth-child(1) span {
  transform: rotate(-30deg);
}

.number:nth-child(2) {
  transform: rotate(60deg);
}
.number:nth-child(2) span {
  transform: rotate(-60deg);
}

.number:nth-child(3) {
  transform: rotate(90deg);
}
.number:nth-child(3) span {
  transform: rotate(-90deg);
}

.number:nth-child(4) {
  transform: rotate(120deg);
}
.number:nth-child(4) span {
  transform: rotate(-120deg);
}

.number:nth-child(5) {
  transform: rotate(150deg);
}
.number:nth-child(5) span {
  transform: rotate(-150deg);
}

.number:nth-child(6) {
  transform: rotate(180deg);
}
.number:nth-child(6) span {
  transform: rotate(-180deg);
}

.number:nth-child(7) {
  transform: rotate(210deg);
}
.number:nth-child(7) span {
  transform: rotate(-210deg);
}

.number:nth-child(8) {
  transform: rotate(240deg);
}
.number:nth-child(8) span {
  transform: rotate(-240deg);
}

.number:nth-child(9) {
  transform: rotate(270deg);
}
.number:nth-child(9) span {
  transform: rotate(-270deg);
}

.number:nth-child(10) {
  transform: rotate(300deg);
}
.number:nth-child(10) span {
  transform: rotate(-300deg);
}

.number:nth-child(11) {
  transform: rotate(330deg);
}
.number:nth-child(11) span {
  transform: rotate(-330deg);
}

.number:nth-child(9) {
  transform: rotate(270deg);
}
.number:nth-child(9) span {
  transform: rotate(-270deg);
}

/*#second{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  animation: sec 60s steps(60, end) infinite;*/
/*}*/
.hands-wrap{
  position: absolute;
  text-align: center;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
}

.second{
  width: 4px;
  height: 112px;
  border-radius: 2px;
  background-color: red;
  margin-top: 17px;
  box-shadow: 1px 2px 3px #00000026;
}

/*#minute{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  animation: sec 3600s steps(60, end) infinite;*/
/*}*/

.minute{
  width: 8px;
  height: 100px;
  border-radius: 4px 4px 2px 2px;
  background-color: #bed4fd;
  position: absolute;
  margin-top: 28px;
  box-shadow: -1px 0px 5px #00000026;
}

.hour{
  width: 9px;
  height: 90px;
  border-radius: 7px 7px 3px 3px;
  background-color: rgba(7, 243, 223, 0.73);
  position: absolute;
  margin-top: 38px;
  box-shadow: -1px 0px 5px #00000026;
}
</style>
