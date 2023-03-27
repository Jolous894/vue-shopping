import Mock from 'mockjs'

//webpack默认对外暴露的：图片、JSon数据格式  所以不需要对外爆暴露就可以引入
import banner from './banner.json'
import floor from './floor.json'

//参1 请求地址  参2：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})