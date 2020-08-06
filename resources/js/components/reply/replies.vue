<template>
    <div>
        <reply v-for="(reply,index) in replies" :key="reply.id" :data="reply" :index=index></reply>
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
        }
    }
}
</script>
