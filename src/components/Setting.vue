<template lang="html">
  <div class="setting">
    <div class="setting-inner">
      <h1>Setting</h1>
      <!--
        form v-on possible
        prevent = page not change
      -->
      <form v-on:submit.prevent="savedSttings">
        <fieldset>
          <label for="startTime">시작 시간</label>
          <select id="startTime" name="" v-model="settings.startTime">
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
          </select>
        </fieldset>
        <fieldset>
          <label for="lang">달력 언어</label>
          <select id="lang" name="" v-model="settings.lang">
            <option value="ko">한국어</option>
            <option value="en">영어</option>
          </select>
        </fieldset>
        <fieldset class="submit">
          <button class="save" type="submit" name="button">저장</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters, mapActions} from 'vuex'

export default {
  name:'Setting',
  methods:{
    ...mapActions(['saveSettings']),
    savedSttings(){
      let url = `https://new-daily-report-879ab.firebaseio.com/settings.json`;
      axios.put(url,this.settings).then((res)=>{
        this.saveSettings(this.settings);
        alert(`저장이 완료되었습니다.`);
      });
    },
    getSettings(){
      this.settings = this.savedSettings;
    }
  },
  computed:{
    ...mapGetters(['savedSettings'])
  },
  data(){
    return{
      settings:{
        startTime: '08:00',
        lang:'en'
      }
    }
  },
  created(){
    this.getSettings();
  }
}
</script>

<style lang="css">
</style>
