import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from './services/TokenService'

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "admin",
    redirect: { name: "Dashboard" },
    component: () => import("./components/admin/MainDashboardLayout.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("./views/reglog/Dashboard.vue"),
      },
      {
        path: 'exam',
        component: () => import("./views/examination"),
        children: [
          {
            path: '/',
            name: 'Exam',
            component: () => import("./views/examination/Questions.vue")
          },
          {
            path: 'create-exam/:id?',
            name: 'CreateExam',
            component: () => import("./views/examination/AddEdit.vue")
          },
          {
            path: 'get-exam',
            name: 'GetExam',
            component: () => import("./views/examination/Examination.vue")
          }
        ]
      },
      {
        path: 'contact',
        component: ()=> import('./views/contacts'),
        children: [
          {
            path: '/',
            name: 'contacts',
            component: ()=>import('./views/contacts/Contacts.vue')
          },
          {
            path: 'create-contact/:id?',
            name: 'CreateContact',
            component:()=>import('./views/contacts/AddEdit.vue')
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("./views/reglog/Login.vue"),
  },
  {
    path: "/registration",
    name: 'registration',
    component: () => import("./views/reglog/Registration.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to,from,next)=>{
  if(TokenService.getToken('Authorization')){
      if(to.path === '/login' || to.path === '/register'){
          next({path: '/admin'})
      }
      else next();
  }else{
      if(
          to.path === "/login"||
          to.path === "/registration"||
          to.path === "/"
      ){
          next();
      }
      else{
          next('/login')
      }
  }
})

export default router;
