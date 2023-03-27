import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

//导航栏
import TypeNav from './components/TypeNav/index'

import store from './store/index'

import './mock/mockServe'
import * as API from './api/index'
import VueLazyload  from 'vue-lazyload'
import gt from './assets/dog.jpg'

//swiper样式
import "swiper/css/swiper.css"
//element-ui
import { Carousel,Tabs,Pagination,carouselItem,Image,MessageBox,Form,FormItem,Input,Button} from 'element-ui'

Vue.use(VueLazyload,{
  loading:gt
})
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$API = API

Vue.config.productionTip = false
Vue.component(Tabs.name,Tabs)
Vue.component(carouselItem.name,carouselItem)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Image.name,Image)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(Input.name,Input)
Vue.component(Button.name,Button)
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
  },
}).$mount('#app')
