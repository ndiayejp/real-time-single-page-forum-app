import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Parallex from "../components/Parallex"
import Login    from '../components/login/Login'
import signup   from '../components/login/register'
import Logout   from '../components/login/logout'
import Forum    from '../components/forum/forum'
import Read     from '../components/forum/read'
import Create   from '../components/forum/create'

const routes = [
    {
        path        : '/',
        component   : Parallex
    },
    {
        path        : '/login',
        component   : Login,
     },
    {
        path        : '/logout',
        component   : Logout
    },
    {
        path        : '/signup',
        component   : signup
    },

    {
        path        : '/forum',
        component   : Forum,
        name        : 'forum'
    },
    {
        path        : '/ask',
        component   : Create
    },
    {
        path        : '/question/:slug',
        component   : Read,
        name        : 'read'
    },
]



const router = new VueRouter({
    routes, // short for `routes: routes`,
    hashbang: false,
    mode    : 'history'
})


export default router
