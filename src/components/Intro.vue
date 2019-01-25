<template lang="html">
  <div class="intro">
    <div class="intro-inner">
      <h1>Daily<br />Report</h1>
      <router-link class="button" v-bind:to="todayUrl">
        <!--
          data bind to (x) v-bind:to (o)
        -->
        START
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment' //javaScript day library
export default {
  name:'Intro',
  methods:{},
  computed:{
    todayUrl(){
      return '/day/'+moment(new Date()).format('YYYY-MM-DD');
    }
  },
  data(){
    return{}
  },
}
</script>

<style lang="css">
</style>
