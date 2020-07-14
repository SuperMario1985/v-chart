import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import QuestionList from '@/components/QuestionList'
// import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/1'
    },
    {
      path: '/home/:catId',
      name: 'Home',
      component: Home
    },
    // {
    //   path: '/question-list/:catId/:classifyID/:slug?',
    //   name: 'QuestionList',
    //   component: QuestionList
    // },
    // {
    //   path: '/question-detail/:catId/:classifyID/:id/:slug?',
    //   name: 'QuestionDetail',
    //   component: QuestionDetail
    // },
    {
      path: '*',
      name: 'Home',
      component: Home
    }
  ]
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//   debugger
//   if (to.matched.length > 0) {
//     next()
//   } else {
//     let path = to.path;
//     let catId = 1;
//     if (path.indexOf('question-list/')) {
//       let num = path.indexOf('question-list/');
//       catId = path.slice(15, 15 + 1);
//       debugger
//     }
//     next({
//       path: "/"
//     });
//   }
// })
export default router
