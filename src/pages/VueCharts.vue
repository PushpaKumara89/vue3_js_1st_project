<template>
  <div class="container-fluid">
    <div class="row vh-100 w-100">
      <div class="col-md-3 bg-dark-subtle d-flex flex-column">
        <router-link to="/charts/bar" class="btn btn-primary m-3">
          Bar Chart
        </router-link>
        <router-link to="/charts/bubble_chart" class="btn btn-primary m-3">
          Bubble Chart
        </router-link>
        <router-link to="/charts/dough_nut" class="btn btn-primary m-3">
          Dough Nut
        </router-link>
        <router-link to="/charts/line_chart" class="btn btn-primary m-3">
          Line Chart
        </router-link>
        <router-link to="/charts/mix_chart" class="btn btn-primary m-3">
          Mix Chart
        </router-link>

        <router-link to="/charts/radar_chart" class="btn btn-primary m-3">
          Radar Chart
        </router-link>
      </div>
      <div class="col-md-9 bg-dark">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>
