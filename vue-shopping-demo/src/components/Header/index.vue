<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>乐易网欢迎您！</p>
          <p v-if="!userInfo.loginName">
            <router-link to="/login">登录</router-link>>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{userInfo.loginName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link :to="{path:'/center'}">我的订单</router-link>
          <a @click="goShopCart">我的购物车</a>
          <a >我的乐易</a>
          <a >乐易会员</a>
          <a>企业采购</a>
          <a >关注乐易</a>
          <a >合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      keyWord: "",
    };
  },
  computed:{
    ...mapState('user',['userInfo'])
  },
  methods: {
    ...mapActions('user',['userLogout']),
    //搜索关键字
    goSearch() {
      let location = {
        name: "search",
        params: {
          keyword: this.keyWord,
        },
      };
      location.query = this.$route.query
      this.$router.push(location);
    },
    //跳转购物车
    goShopCart(){
      this.$router.push({
        name:"shopcart",

      })
    },
    //清除关键字
    clearKeyWord(){
      this.keyWord=''
    },
    //退出登录
    async logout(){
      try {
        await this.userLogout()
        this.$router.push({name:'home'})
      } catch (error) {
        alert(error.message)
      }
    },
  },
  mounted(){
    this.$bus.$on("clearKeyWord",this.clearKeyWord)
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>