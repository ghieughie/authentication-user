import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/SignIn.vue";
import Register from "../views/SignUp.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      component: DefaultLayout,
      children: [{ path: "/home", name: "home", component: HomeView }],
    },
    {
      path: "/:catchAll(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export default router;
