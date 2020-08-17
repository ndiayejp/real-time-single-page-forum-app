window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}


window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const JwtToken = `Bearer ${localStorage.getItem('token')}`
window.axios.defaults.headers.common['Authorization'] = JwtToken

let token = document.head.querySelector('meta[name="csrf-token"]');

if(token){
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}else{
    console.error('CSRF TOKEN not found');
}

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'b680962cc68a7ffaea88',
    cluster: 'eu',
    forceTLS: true,
    auth:{
        headers:{
            Authorization:JwtToken
        }
    }
});
