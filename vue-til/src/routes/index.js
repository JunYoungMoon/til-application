import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("@/views/LoginPage.vue"),
    },
    {
        path: "/signup",
        component: () => import("@/views/SignupPage.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/NotFoundPage.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
