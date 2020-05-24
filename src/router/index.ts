import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/connect",
    name: "Connect",
    component: () => import("../views/connect.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/session",
    name: "Session",
    component: () => import("../views/session.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next({ path: "/login", query: { returnUrl: to.fullPath } });
  } else {
    next();
  }
});

export default router;
