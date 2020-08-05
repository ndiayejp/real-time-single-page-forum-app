<template>
    <div v-if="question">

    </div>
</template>

<script>
export default {
    data(){
        return {
            question:null,
        }
    },
    created(){
        this.getQuestion()
    },
    methods:{
        getQuestion(){
            axios.get(`/api/question/${this.$route.params.slug}`)
            .then(res => this.question = res.data.data)
        }
    }
}
</script>
