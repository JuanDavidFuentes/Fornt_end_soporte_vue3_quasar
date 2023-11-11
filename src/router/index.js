import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../components/User.vue"),
    },
    {
      path: "/machine",
      name: "machine",
      component: () => import("../components/Machine.vue"),
    },
    {
      path: "/send",
      name: "send",
      component: () => import("../components/Send.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../components/Settings.vue"),
    },
    {
      path: "/citys",
      name: "citys",
      component: () => import("../components/Citys.vue"),
    },
    {
      path: "/companies",
      name: "companies",
      component: () => import("../components/Companies.vue"),
    },

    // {
    //   path: "/:pathMatch(.*)*", // esto es para el 404
    //   name: "NotFound",
    //   component: () => import("../views/NotFoundView.vue"),
    // },
  ],
});

export default router;
