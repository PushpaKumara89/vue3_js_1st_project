<template>
  <div style="height: 750px;"><canvas id="dimensions"></canvas></div><br/>

</template>

<script>
import Chart from 'chart.js/auto';
import { getDimensions  } from '../api'

export default {

  mounted(){
    (async function() {
      const data = await getDimensions();


      data.map(x=> {
        console.log(x.count)})
      let  labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      new Chart(
          document.getElementById('dimensions'),
          {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                tension: 0.3
              }]
            }
          }
      );
    })();
  }
}

</script>

<style scoped>

</style>
