import Vue from 'vue';
import VueRouter from 'vue-router';

import Authenticate from '../components/Authenticate';
import WishList from '../components/WishList';
import Home from '../components/Home';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'open active',
    routes: [
        {
            path: '/authenticate',
            name: 'Authenticate',
            component: Authenticate
        },
        {
            path: '/wishlist',
            name: 'WishList',
            component: WishList
        },
        {
            path: '/home',
            name: 'Home.vue',
            component: Home
        }
    ]
});

export default router