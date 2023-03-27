//引入路由组件
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'




//路由配置信息
export default [ 
    {   
        name:'home',
        path: "/home",
        //路由懒加载
        component: ()=>import('../pages/Home'),
        meta: {
            showFooter: true
        },
    },
    {
        path:"/shopcart",
        name:"shopcart",
        component:ShopCart
    },
    {
      path:"/detail/:skuid",
      name:"detail",
      component:Detail, 
      meta: {
        showFooter: true
    },
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCartSuccess,
    },
    {
        name: 'search', 
        path: '/search/:keyword?',
        component: Search,
        meta: {
            showFooter: true,
        },
    },
    {
        name: 'login',
        path: "/login",
        component: Login,
    },
    {   name:'register',
        path: "/register",
        component: Register,
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade,
    },
    {
        name:'pay',
        path:'/pay',
        component:Pay,
    },
    {
        path:"/paysuccess",
        name:"paysuccess",
        component:PaySuccess,
    },
    {   
        path: "/center",
        component: Center,
        children:[
            {
                path:'myorder',
                component:MyOrder

            },
            {
                path:'grouporder',
                component:GroupOrder 
            },
            {
                path:'',
                redirect: '/center/myorder'
            }
        ]
    },

    //重新定向，在项目跑起来的时候，访问/ 时，立马让他定向到首页
    {
        path: '/',
        redirect: '/home'
    },
]