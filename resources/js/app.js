
require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

Vue.component('app-home', require('./components/AppHome.vue').default);

import router from "./Router/router.js"

import User from "./Helpers/User"
window.User = User

import Exception from "./Helpers/Exception"
window.Exception = Exception

window.EventBus = new Vue()

import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

import md from "marked"
window.md = md

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fab, fas, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const app = new Vue({
    el: '#app',
    router
});
