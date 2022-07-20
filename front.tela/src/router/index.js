import Vue from "vue";
import VueRouter from "vue-router";
import Usuarios from '@/views/usuarios';
import Funcionarios from '@/views/funcionarios';
import Login from '@/views/login';
import Estoque from '@/views/estoque';
import Dashboard from '@/views/dashboard';
import Clientes from '@/views/clientes';
import Vendas from '@/views/vendas';

Vue.use(VueRouter);

const routes = [
  {
    path: "/estoque",
    name: "estoque",
    component: Estoque,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: "/clientes",
    name: "clientes",
    component: Clientes,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: "/funcionarios",
    name: "funcionarios",
    component: Funcionarios,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/vendas",
    name: "vendas",
    component: Vendas,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
    meta: {
      requeresAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //  import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes
});

//router.beforeEach((to, from, next) => {
 // if (to.matched.some(route => route.meta.requiresAuth)) {
//    if (Auth.currentUser) {
 //     next();
 //   } else {
 //     next({ path: '/user/login' });
 //   }
 // }
 // next();
//});


export default router;
