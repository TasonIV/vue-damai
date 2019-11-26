import Vue from 'vue'
import VueRouter from 'vue-router'
import Selected from "../views/Selected"
import NotFound from "../components/NotFound"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "selected",
    component: Selected,
    alias: "/selected"
  },
  {
    path:"/sign",
    name: "sign",
    component: () => import('../views/Sign')
  },
  {
    path:"/register",
    name: "register",
    component: () => import('../views/Register')
  },
  {
    path: "/all",
    name: "all",
    component: () => import('../views/All'),
    redirect: "/all/show",
    children: [{
      path: "show",
      name: "show",
      props: true,
      component: () => import("../views/AllViews/Show")
    },
    {
      path: "star",
      name: "star",
      component: () => import("../views/AllViews/Star"),
      // children:[{
      //   props:true,
      //   path:":name",
      //   name:"liststar",
      //   component:() => import("../components/StarsDetail/ListStar")
      // }]
    }
    ]
  },
  {
    path: "/find",
    name: "find",
    component: () => import('../views/Find')
  },
  {
    path: "/ticket",
    name: "ticket",
    component: () => import('../views/Ticket')
  },
  {
    path: "/my",
    name: "my",
    component: () => import('../views/My'),
    children: [
      {
        path: "address",
        name: "address",
        props: true,
        component: () => import("../views/MyViews/Address"),
        children: [
          {
            path: "add",
            name: "add",
            component: () => import("../views/MyViews/Add")
          }
        ]
      },
      {
        path: "man",
        name: "man",
        props: true,
        component: () => import("../views/MyViews/Man"),
        children: [
          {
            path: "manadd",
            name: "manadd",
            component: () => import("../views/MyViews/ManAdd"),
          }
        ]
      }
    ]
  },
  {
    path:"/indetail",
    name:"indetail",
    props:true,
    component:() => import("../components/ShowDetail/InDetail")
  },
  {
    path: "/location",
    name: "location",
    component: () => import("../views/Location")
  },
  {
    path: "/message",
    name: "message",
    component: () => import("../views/Message")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search")
  },
  {
    path:"/calendar",
    name: "calendar",
    component: () => import('../views/Calendar')
  },
  {
    path: "*",
    component: NotFound
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
})

export default router
