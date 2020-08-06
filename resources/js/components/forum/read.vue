<template>
    <div v-if="question">
        <edit-question :data="question" v-if="editing"></edit-question>
    <div v-else>
        <show-question :question="question"></show-question>
    </div>
    </div>
</template>

<script>
import showQuestion from "./showQuestion"
import editQuestion from "./editQuestion"
export default {
    data(){
        return {
            question          : null,
            editing           : false,
            beforeEditContent : ""
        }
    },
    created(){
        this.getQuestion()
        EventBus.$on('startEdit',()=>{
            this.editing = true
            this.beforeEditContent = this.question.content
        })
        EventBus.$on('cancelEdit',(body)=>{
            this.editing = false
            if(this.question.content !==body){
                this.question.body = this.beforeEditContent
                this.beforeEditContent = ""
            }
        })
    },
    components:{
         showQuestion, editQuestion
    },
    methods:{
        getQuestion(){
            axios.get(`/api/question/${this.$route.params.slug}`)
            .then(res => this.question = res.data.data)
        }
    }
}
</script>
