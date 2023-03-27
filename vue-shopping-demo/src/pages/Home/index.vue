<template>
  <dir>
    <type-nav></type-nav>
    <listCntainer></listCntainer>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor></floor>
  </dir>
</template>

<script>
import listCntainer from './ListContainer/index'
import recommend from './Recommend/index'
import rank from './Rank/index'
import like from './Like/index'
import floor from './Floor/index'
import {mapActions} from 'vuex'
export default {
components: {
  listCntainer,
  recommend,
  rank,
  like,
  floor,
},
methods:{
  ...mapActions('user',['getUserInfo'])
},
mounted(){
}
}
</script>

<style>

</style>