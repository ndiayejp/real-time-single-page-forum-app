<template>
   <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card-title"><h4>{{question.name}}</h4></div>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex justify-content-end">
                                    <span class="mr-1 btn btn-outline-secondary btn-sm"> {{question.category}}</span>
                                    <div class="ml-1 btn btn-info btn-sm text-white"> <strong>{{replyCount}}  <font-awesome-icon :icon="['fas', 'reply']" /></strong></div>
                                </div>
                            </div>
                        </div>
                        <p class="card-text"><small class="text-muted">{{question.created_at}}</small></p>
                        <p v-html="body"></p>
                    </div>
                    <div class="card-footer d-flex justify-content-between" v-if="owner">
                        <div>
                            <button @click="editing" class="btn btn-sm btn-outline-secondary border-0">
                                <font-awesome-icon :icon="['fas', 'pen']" size="lg"/>
                            </button>
                        </div>
                        <div>
                            <button @click="destroy" class="btn btn-sm btn-outline-danger border-0">
                                <font-awesome-icon :icon="['fas', 'trash']" size="lg"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <replies   :question="question" v-if="question.replies"></replies>
                <new-reply v-if="loggedIn" :questionSlug="question.slug"></new-reply>
                <div v-else>
                    <router-link to="/login" class="btn btn-success">Se connecter</router-link>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import newReply from "../reply/newReply"
import Replies from "../reply/replies"
export default {
    props:['question'],
    data(){
        return{
            replyCount: this.question.reply_count
        }
    },
    computed:{
        body(){
             return md.parse(this.question.content)
        },
        owner(){
            return  User.owner(this.question.user_id)
        },
        loggedIn(){
            return User.loggedIn()
        }
    },
    created(){
        EventBus.$on('newReply',()=>{
            this.replyCount++
        })

        EventBus.$on('deleteReply',()=>{
            this.replyCount--
        })

         Echo.private('App.User.' + User.id())
            .notification((notification) => {
                  this.replyCount++
            });

        Echo.channel('deleteReplyChannel')
        .listen('DeleteReplyEvent',(e) => {
            this.replyCount--
        })
    },
    components:{
        Replies, newReply
    },
    methods:{
        destroy(){
            axios.delete(`/api/question/${this.question.slug}`)
            .then((res)=>{
                this.$router.push('/forum')
            }).catch((err)=>{
                console.log(err)
            })
        },
        editing(){
            EventBus.$emit('startEdit')
        }
    }
}
</script>
