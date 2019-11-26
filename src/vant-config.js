
// 在此处按需引入插件，能让main.js结构更清晰
import { Area, Rate, Collapse, CollapseItem, Search, Button, Sticky, Dialog, Toast,Field  } from 'vant';

let AntComponents = [Area, Rate, Collapse, CollapseItem, Search, Button, Sticky, Dialog, Toast,Field ]

export default {
    install(Vue) { // Vue.use会自动触发该方法,并将Vue构造函数传入该方法中
        AntComponents.forEach(component => {
            // console.log(component.name)
            Vue.component(component.name, component) // 某些组件使用该方法无法完全注册
            // Vue.use(component)
            // 以上两种方法都可以用来引用组件
        })
    }
}

