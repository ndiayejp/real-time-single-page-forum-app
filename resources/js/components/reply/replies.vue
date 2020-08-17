<template>
    <div>
         <div class="card shadow-sm mb-2" v-if="replies.length >0">
            <div class="card-body">
               <reply v-for="(reply,index) in replies" :key="reply.id" :data="reply" :index=index></reply>
            </div>
         </div>
    </div>
</template>
<script>
import Reply from "./reply"
export default {
    props:['question'],
    data(){
        return{
            replies: this.question.replies
        }
    },
    created(){
        this.listen()
    },
    components:{
        Reply
    },
    methods:{
        listen(){
            EventBus.$on('newReply',(reply)=>{
                this.replies.unshift(reply)
                window.scrollTo({top:0,behavior:"smooth"})
            })
            EventBus.$on('deleteReply', (index)=>{
                axios.delete(`/api/question/${this.question.slug}/reply/${this.replies[index].id}`)
                .then((res)=>{
                    this.replies.splice(index,1)
                }).catch(err=>Exception.handle(err))
            })

            Echo.private('App.User.' + User.id())
            .notification((notification) => {
                this.replies.unshift(notification.reply)
            });

           Echo.channel('deleteReplyChannel')
            .listen('DeleteReplyEvent',(e) => {
                console.log(e)
                for(let index = 0 ;index < this.replies.length;index++){
                    if(this.replies[index].id == e.id){
                        this.replies.splice(index,1)
                    }
                }
            })
        }
    }
}
</script>
