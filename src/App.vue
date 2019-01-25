<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script type="text/javascript">
  import Nav from './components/Nav'
  import axios from 'axios'
  /*
    vuex method mapGetters,mapActions use
    mapGetters : getters take
    mapActions : actions take
  */
  import { mapGetters, mapActions} from 'vuex';
  export default{
    components:{
      Nav
    },
    methods:{
      ...mapActions(['saveSettings']),//method enrollment
      init(){
        if(typeof this.savedSettings.startTime === 'undefined'){
            this.getSettings();
        }
      },
      getSettings(){
        let url = `https://new-daily-report-879ab.firebaseio.com/settings.json`;
        axios.get(url).then((res)=>{
          this.saveSettings(res.data);//store update
        });
      }
    },
    created(){
      this.init();
    },
    computed:{
      ...mapGetters(['savedSettings'])
    }
  }
</script>
<!--
is top vue
all components apply scss
because App.vue is top vue
 -->
<style lang="scss" src="./assets/css/style.scss"></style>
