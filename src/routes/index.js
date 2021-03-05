import Vue from 'vue';
import VueRouter from 'vue-router';

import Authenticate from '../components/Authenticate';
import WishList from '../components/WishList';
import Home from '../components/Home';

import store from '../store';

Vue.use(VueRouter);

async function redirectIfNotAuth (to, from, next) {
    const user = await getUserState();
    console.log(user.loggedIn);
    if (user.loggedIn) {
        next()
    } else {
        next({ name: 'Authenticate' })
    }
}

async function redirectIfAuth (to, from, next) {
    const user = await getUserState();
    console.log(user.loggedIn);
    if (user.loggedIn) {
        next({ name: 'Home' })
    } else {
        next()
    }
}


function getUserState () {
    return store.state.user;
}

  
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/authenticate',
            name: 'Authenticate',
            component: Authenticate,
            beforeEnter: redirectIfAuth
        },
        {
            path: '/wishlist',
            name: 'WishList',
            component: WishList,
            beforeEnter: redirectIfNotAuth
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            beforeEnter: redirectIfNotAuth

        }
    ]
  });
  

export default router