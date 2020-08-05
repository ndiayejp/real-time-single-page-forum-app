/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

Vue.component('app-home', require('./components/AppHome.vue').default);

import router from "./Router/router.js"

import User from "./Helpers/User"
window.User = User

window.EventBus = new Vue()

import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

Vue.component('vue-simplemde', VueSimplemde)

import md from "marked"
window.md = md


const app = new Vue({
    el: '#app',
    router
});
