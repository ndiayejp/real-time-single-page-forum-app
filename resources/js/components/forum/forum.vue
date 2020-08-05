<template>
    <div class="container">
        <loading
            :active.sync="isLoading"
            :can-cancel  ="true"
            :is-full-page="fullPage"
            :opacity     ="0.1"
            loader="dots" color="#529ae4" :width="100">
        </loading>
       <div class="row" v-if="isloggin">
           <div class="col-md-12">
               <router-link to="/ask" class="btn btn-primary mb-2">Poser une question</router-link>
           </div>
       </div>
       <div class="row">
           <question v-for="question in questions" :key="question.name" :data="question"></question>
       </div>
    </div>
</template>

<script>
import question from "../forum/question"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    data(){
        return {
            questions   : {},
            isLoading   : false,
            fullPage    : false
        }
    },
    created(){
         this.isLoading = true;
        axios.get('/api/question')
        .then((res)=>{
            this.isLoading = false
            this.questions  = res.data.data
        }).catch((err)=>{
            this.isLoading = false
         })
    },
    components:{
        question,Loading
    },
    computed:{
        isloggin(){
            return User.loggedIn()
        }
    }
}
</script>
