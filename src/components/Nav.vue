<!--
Navgationbar
-->
<template lang="html">
  <div class="nav">
    <ul class="nav-list">
      <li>
        <button v-on:click="today" type="button" name="button">
          <i class="xi-home"></i>
          <span>오늘</span>
        </button>
      </li>
      <li>
        <router-link to="/calendar">
          <i class="xi-calendar"></i>
          <span>달력</span>
        </router-link>
      </li>
      <li>
        <router-link to="/setting">
          <i class="xi-cog"></i>
          <span>설정</span>
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <i class="xi-emoticon-smiley"></i>
          <span>소개</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment' //javaScript day library

export default {
  name:'Nav',
  methods:{
    today(){
      let todayUrl = '/day/'+moment(new Date()).format('YYYY-MM-DD');
      this.$router.push(todayUrl);//$router.push is todayUrl push
    }
  },
  computed:{},
  data(){
    return{}
  },
}

</script>

<style lang="css">
</style>
