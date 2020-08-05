<template>
    <div v-if="question">
        <edit-question :data="question" v-if="editing"></edit-question>
        <div v-else>
            <show-question :data="question"></show-question>
        </div>
    </div>
</template>

<script>
import showQuestion from "./showQuestion"
import editQuestion from "./editQuestion"
export default {
    data(){
        return {
            question:null,
            editing:false
        }
    },
    created(){
        this.getQuestion()
        EventBus.$on('startEdit',()=>{
            this.editing = true
        })
        EventBus.$on('cancelEdit',()=>{
            this.editing = false

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
