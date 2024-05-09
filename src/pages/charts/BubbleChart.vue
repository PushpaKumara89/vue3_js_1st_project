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

      new Chart(
          document.getElementById('dimensions'),
          {
            type: 'bubble',
            data: {
              datasets: [
                {
                  label: 'width = height',
                  data: data
                      .filter(row => row.width === row.height)
                      .map(row => ({
                        x: row.width,
                        y: row.height,
                        r: row.count
                      }))
                },
                {
                  label: 'width > height',
                  data: data
                      .filter(row => row.width > row.height)
                      .map(row => ({
                        x: row.width,
                        y: row.height,
                        r: row.count
                      }))
                },
                {
                  label: 'width < height',
                  data: data
                      .filter(row => row.width < row.height)
                      .map(row => ({
                        x: row.width,
                        y: row.height,
                        r: row.count
                      }))
                }
              ]
            }
          }
      );
    })();
  }
}

</script>

<style scoped>

</style>
