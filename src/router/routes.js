export default [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/list",
    name: "ListPage",
    component: () =>
      import(/* webpackChunkName: "ListPage" */ "../views/ListPage.vue"),
  },
  {
    path: "/add-link",
    name: "AddLink",
    component: () =>
      import(/* webpackChunkName: "AddLink" */ "../views/AddLink.vue"),
  },
];
