<template>
    <div class="pb-3">
        <markdown-editor v-model="reply.reply" ref="markdownEditor"></markdown-editor>
        <button @click="update" class="btn btn-sm btn-success">
            <font-awesome-icon :icon="['fas', 'save']"/> Mettre à jour
        </button>
        <button @click="cancel" class="btn btn-sm btn-dark">
            <font-awesome-icon :icon="['fas', 'window-close']"/> Annuler
        </button>
    </div>
</template>
<script>
import markdownEditor  from 'vue-simplemde'
export default {
    props:['reply'],
    components: {
        markdownEditor
    },
    methods:{
        cancel(reply){
            EventBus.$emit("cancelReply",reply)
        },
        update(){
            axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`,{content:this.reply.reply})
            .then((res)=>{
                this.cancel(this.reply.reply)
            }).catch((err)=>{console.log(err)})
        }
    }
}
</script>
