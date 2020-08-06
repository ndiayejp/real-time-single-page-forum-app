<template>
    <div>
        <div class="card shadow-sm mb-2 rounded-0">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div><strong>{{data.user}}</strong> <span class="text-muted">a répondu {{data.created_at}}</span></div>
                    <div><like :reply="data"></like></div>

                </div>
                 <edit-reply v-if="editing" :reply=data></edit-reply>
                        <p v-html="reply" v-else class="mt-4"></p>
            </div>
            <div v-if="!editing">
                <div class="card-footer bg-transparent border-default" v-if="owner">
                    <button @click="edit" class="btn btn-sm btn-outline-secondary">
                        <font-awesome-icon :icon="['fas', 'pen']"/> Editer
                    </button>
                    <button @click="destroy" class="btn btn-sm btn-danger">
                        <font-awesome-icon :icon="['fas', 'trash']"/> Supprimer
                    </button>
                </div>
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
