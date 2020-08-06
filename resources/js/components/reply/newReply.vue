<template>
    <div>
         <div class="card shadow-sm mb-2 rounded-0">
            <div class="card-body">
                <h4 class="card-title">Nouvelle réponse</h4>
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success text-white btn-lg" :disabled="!FormIsValid">
                            <font-awesome-icon :icon="['fas', 'save']"/> Enregistrer
                        </button>
                    </div>
                </form>
            </div>
         </div>
    </div>
</template>
<script>
import markdownEditor  from 'vue-simplemde'
export default {
    props:['questionSlug'],
    data(){
        return{
            content:null
        }
    },
    computed:{
        FormIsValid(){
            return this.content!==""
        },
        simplemde () {
            return this.$refs.markdownEditor.simplemde
        }
    },
    components: {
        markdownEditor
    },
    methods:{
        submit(){
            axios.post(`/api/question/${this.questionSlug}/reply`,{
                content:this.content
            })
            .then((res)=>{
                this.content            = ""
                this.simplemde.value    = ""
                EventBus.$emit('newReply',res.data)
            }).catch( err=>Exception.handle(err))
        }
    }
}
</script>
