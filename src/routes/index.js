import Vue from 'vue';
import VueRouter from 'vue-router';

import Authenticate from '../components/Authenticate';
import WishList from '../components/WishList';
import Home from '../components/Home';

import store from '../store';

Vue.use(VueRouter);

async function redirectIfNotAuth (to, from, next) {
    const user = await getUserState();
    if (user.loggedIn) {
        next()
    }else{
        next({ name: 'Authenticate' })
    }
}

function getUserState () {
    return store.state.user;
}

  
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
            
        },
        {
            path: '/authenticate',
            name: 'Authenticate',
            component: Authenticate
            
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