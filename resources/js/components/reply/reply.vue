<template>
    <div class="question-card">
        <div class="d-flex justify-content-between">
            <div><strong>{{data.user}}</strong> <span class="text-muted"> a répondu {{data.created_at}}</span></div>
            <div><like :reply="data"></like></div>
        </div>
        <edit-reply v-if="editing" :reply=data></edit-reply>
        <div v-html="reply" v-else class="mt-4"></div>

        <div v-if="!editing">
            <div class="border-0 pb-3" v-if="owner">
                <button @click="edit" class="btn btn-sm btn-outline-secondary border-0">
                    <font-awesome-icon :icon="['fas', 'pen']" size="lg"/>
                </button>
                <button @click="destroy" class="btn btn-sm btn-outline-danger border-0">
                    <font-awesome-icon :icon="['fas', 'trash']" size="lg"/>
                </button>
            </div>
        </div>

    </div>
</template>
<script>
import Like from "../like/Like"
import EditReply from "../reply/editReply"
export default {
    props:['data','index'],
    data(){
        return{
            editing         : false,
            beforeEditReply : ''
        }
    },
    created(){
        this.listen()
    },
    computed:{
        owner(){
            return  User.owner(this.data.user_id)
        },
        reply(){
            return md.parse(this.data.reply)
        }
    },
    components:{
        EditReply, Like
    },
    methods:{
        edit(){
            this.editing         = true
            this.beforeEditReply = this.data.reply
        },
        destroy(index){
            EventBus.$emit('deleteReply',this.index)
        },
        listen(){
            EventBus.$on("cancelReply",(reply)=>{
                this.editing = false
                if(this.data.reply!==reply){
                    this.data.reply        = this.beforeEditReply
                    this.beforeEditReply   = ''
                }

            })
        }
    }
}
</script>
<style>
.question-card{
    border-bottom:1px solid #ddd;
    padding-top: 15px;
}
.question-card:last-child{
    border-bottom:none
}
</style>
