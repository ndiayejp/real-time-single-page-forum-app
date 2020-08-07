<template>
    <div class="container">
        <loading
            :active.sync    =   isLoading
            :can-cancel     =   "true"
            :is-full-page   =   fullPage
            :opacity        =   "0.1"
            loader="dots" color="#529ae4" :width="100">
        </loading>
       <div class="row" v-if="isloggin">
           <div class="col-md-12">
               <router-link to="/ask" class="btn btn-success btn-lg mb-3">
                    <font-awesome-icon :icon="['fas', 'comment-alt']"/> Démarrer une nouvelle discussion
               </router-link>
           </div>
       </div>
       <div class="row">
           <div class="col-md-9">
               <question v-for="question in questions" :key="question.name" :data="question"></question>
           </div>
           <div class="col-md-3">
               <app-sidebar></app-sidebar>
           </div>
       </div>
    </div>
</template>

<script>
import appSidebar from "./appSidebar"
import question from "../forum/question"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    data(){
        return {
            questions   : {},
            isLoading   : false,
            fullPage    : true
        }
    },
    created(){
        this.isLoading      = true;
        axios.get('/api/question')
        .then((res)=>{
            this.isLoading  = false
            this.questions  = res.data.data
        }).catch((err)=>{
            this.isLoading  = false
        })
    },
    components:{
        question,
        Loading,
        appSidebar
    },
    computed:{
        isloggin(){
            return User.loggedIn()
        }
    }
}
</script>
