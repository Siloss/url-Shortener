import Vue from "vue";
import VueRouter from "vue-router";
import jwt from "jsonwebtoken";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/Stats",
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login.vue"),
		meta: {
			layout: "Authorization_layout",
		},
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/Register.vue"),
		meta: {
			layout: "Authorization_layout",
		},
	},
	{
		path: "/stats",
		name: "Stats",
		component: () => import("../views/Stats.vue"),
		meta: {
			layout: "Main_layout",
		},
	},
	{
		path: "/links",
		name: "Links",
		component: () => import("../views/Links.vue"),
		meta: {
			layout: "Main_layout",
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.name != "Login" && to.name != "Register") {
		const token = jwt.decode(localStorage.getItem("jwt"));
		const now = (Date.now() / 1000).toFixed(0);

		if (!token) return next("Register");

		if (now >= token.exp) {
			next("Login");
		} else next();
	} else next();
});

export default router;
