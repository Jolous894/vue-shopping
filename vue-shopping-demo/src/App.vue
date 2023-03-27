<template>
  <div id="app">
    <div class="outer">
      <MyHeader></MyHeader>
      <router-view></router-view>
      <MyFooter v-show="$route.meta.showFooter"></MyFooter>
    </div>
  </div>
</template>

<script>
import MyHeader from "./components/Header/index.vue";
import MyFooter from "./components/Footer/index.vue";
import {mapActions} from 'vuex'
export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
  methods:{
    ...mapActions("home", ["categoryList"]),

  },
  mounted() {
    this.categoryList();
  },
};
</script>

<style lang="less" >
 a {
  cursor: pointer
 }
</style>
