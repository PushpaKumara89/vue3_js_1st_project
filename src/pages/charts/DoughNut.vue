<template >

  <div class="w-100 h-100 " style="display: flex; justify-content: center; align-items: center">
    <div class="pi" style="height:600px;width: 600px;"><canvas id="dimensions"></canvas></div><br/>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
// import { getDimensions  } from './api'

export default {

  mounted(){
    (async function() {


      new Chart(
          document.getElementById('dimensions'),
          {
            type: 'doughnut',
            data: {
              labels: [
                'Red',
                'Blue',
                'Yellow'
              ],
              datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
            }
          }
      );

    })();
  }
}

</script>

<style scoped>
.pi{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>