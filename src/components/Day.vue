<template lang="html">
  <div class="day">
    <h1 class="day-title">
      <!--
        router paramter data
        (.data)
      -->
      {{$route.params.date}}
    </h1>
    <ul class="day-list">
      <li v-for="item in items" :key="item.id" class="day-list-item" v-bind:class="{'open': item.open}">
        <div class="time">
          {{item.id}}
        </div>
        <div class="action">
          <p v-if="!item.open" v-on:click="toggleOpen(item)">
            {{item.action}}
            <span v-if="item.action.length === 0">내용을 작성해주세요.</span>
          </p>
          <input v-if="item.open" v-on:keyup.enter="updateItem(item)" v-model="item.action" type="text" name="" value="" placeholder="한 일을 작성해 주세요.">
        </div>
        <div class="Score">
          <!--
            first onUpdateScore is DayScore onUpdateScore first param
            second onUpdateScore is Day onUpdateScore()

            v-bind:item="item" => DayScore.vue send Props
          -->
          <Day-score v-on:onUpdateScore="onUpdateScore" v-bind:item="item"></Day-score>
        </div>
        <div class="note" v-if="item.open">
          <textarea v-model="item.note" name="name" rows="8" cols="80" placeholder="노트를 작성해 주세요."></textarea>
        </div>

        <div class="buttons" v-if="item.open">
          <button v-on:click="updateItem(item)" class="save" type="button" name="button">저장</button>
          <button v-on:click="toggleOpen(item)" class="cancel" type="button" name="button">취소</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DayScore from './DayScore'
import axios from 'axios'//axios -> ajax request
import moment from 'moment'

import {mapGetters} from 'vuex'

export default {
  name:'Day',
  methods:{
    onUpdateScore(item, score){
      item.score = score;
      this.updateItem(item);
    },
    getItems(){
      /*
        life sycle create -> first draw vlaues
      */
      let url = `https://new-daily-report-879ab.firebaseio.com/items.json?orderBy="$key"&startAt="${this.$route.params.date}"&endAt="{this.$route.params.date}-22-24"`;
      axios.get(url).then((res)=>{
        this.items = this.displayItems(res.data);
      });
    },
    displayItems(result){
      /*
        select database data -> check created dataform -> items
      */
      let items = [];//select data box
      let startTime = this.savedSettings.startTime;//App start time
      for (let i = 0; i < 12; i++) {
          let dateTime = moment(this.$route.params.date + ' ' + startTime);//first dataTime created
          let itemKey = `${this.$route.params.date}-${dateTime.add(i*2,'hours').format('HH')}-${dateTime.add(2,'hours').format('HH')}`;//App items created -> 12 itmes and items interval 2hours
          let item = {
            id:itemKey,
            action:'',
            note:'',
            open: false,
            score:undefined
          }
          Object.keys(result).map((key)=>{
            if(key === itemKey){
              item = result[key]
            }
          });
          items.push(item);
      }
      return items;
    },
    updateItem(item){
      console.log(item);
      let url = `https://new-daily-report-879ab.firebaseio.com/items/${item.id}.json`;
      axios.put(url,item).then((res)=>{
        this.getItems();
      });
    },
    toggleOpen(item){
      item.open = !item.open;
    }
  },
  computed:{
    ...mapGetters(['savedSettings']),
  },
  components:{
    DayScore
  },
  data(){
    return{
      items:[]
    }
  },
  props:{},
  created(){
    this.getItems();
  },
  watch:{
    // addrs move check -> component redraw
    '$route'(to,from){
      this.getItems();
    }
  }
}
</script>

<style lang="css">
</style>
