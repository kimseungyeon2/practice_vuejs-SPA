<template lang="html">
  <div class="score">
    <button
      v-for="button in buttons" :key="button.score"
      v-on:click="updateScore(button.score)"
      v-bind:class="{'active': button.score === item.score}"
      type="button"
      name="button"
      >
      {{button.label}}
    </button>
  </div>
</template>

<script>
export default {
  name:'DayScore',
  methods:{
    updateScore(score){
      // Day.vue send
      this.$emit('onUpdateScore', this.item, score);
    }
  },
  computed:{},
  data(){
    return{
      buttons:[
        {label: 'GOOD', score:3},
        {label: 'SOSO', score:2},
        {label: 'BAD', score:1},
      ]
    }
  },
  props:[
    'item'
  ]
}
</script>

<style lang="css">
</style>
